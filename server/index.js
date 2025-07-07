const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/narayana', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Product Schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  image: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  isAuction: { type: Boolean, default: false },
  auctionEndTime: { type: Date },
  status: { type: String, enum: ['active', 'sold', 'expired'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

// Bid Schema
const bidSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  tokensUsed: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Token Purchase Schema
const tokenPurchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Bid = mongoose.model('Bid', bidSchema);
const TokenPurchase = mongoose.model('TokenPurchase', tokenPurchaseSchema);

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      email,
      password: hashedPassword,
      tokens: 100 // Welcome bonus
    });
    
    await user.save();
    
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'fallback_secret'
    );
    
    res.json({ token, user: { id: user._id, username, email, tokens: user.tokens } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'fallback_secret'
    );
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        tokens: user.tokens 
      } 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Purchase tokens
app.post('/api/tokens/purchase', authenticateToken, async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    const price = amount * 0.1; // $0.10 per token
    
    const purchase = new TokenPurchase({
      user: req.user.userId,
      amount,
      price,
      transactionId: uuidv4(),
      status: 'completed' // Simulate successful payment
    });
    
    await purchase.save();
    
    // Update user tokens
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { tokens: amount }
    });
    
    const updatedUser = await User.findById(req.user.userId).select('-password');
    
    res.json({ 
      success: true, 
      purchase,
      newTokenBalance: updatedUser.tokens 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create product/auction
app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    const { title, description, startingPrice, image, category, isAuction, auctionDuration } = req.body;
    
    const product = new Product({
      title,
      description,
      startingPrice,
      currentPrice: startingPrice,
      image,
      seller: req.user.userId,
      category,
      isAuction,
      auctionEndTime: isAuction ? new Date(Date.now() + auctionDuration * 60 * 60 * 1000) : null
    });
    
    await product.save();
    await product.populate('seller', 'username');
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { category, isAuction, status = 'active' } = req.query;
    const filter = { status };
    
    if (category) filter.category = category;
    if (isAuction !== undefined) filter.isAuction = isAuction === 'true';
    
    const products = await Product.find(filter)
      .populate('seller', 'username')
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'username');
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const bids = await Bid.find({ product: req.params.id })
      .populate('bidder', 'username')
      .sort({ timestamp: -1 });
    
    res.json({ product, bids });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Place bid
app.post('/api/products/:id/bid', authenticateToken, async (req, res) => {
  try {
    const { amount, tokensToUse } = req.body;
    const productId = req.params.id;
    
    const user = await User.findById(req.user.userId);
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (!product.isAuction) {
      return res.status(400).json({ error: 'This product is not an auction' });
    }
    
    if (new Date() > product.auctionEndTime) {
      return res.status(400).json({ error: 'Auction has ended' });
    }
    
    if (amount <= product.currentPrice) {
      return res.status(400).json({ error: 'Bid must be higher than current price' });
    }
    
    if (user.tokens < tokensToUse) {
      return res.status(400).json({ error: 'Insufficient tokens' });
    }
    
    // Create bid
    const bid = new Bid({
      product: productId,
      bidder: req.user.userId,
      amount,
      tokensUsed: tokensToUse
    });
    
    await bid.save();
    
    // Update product current price
    product.currentPrice = amount;
    await product.save();
    
    // Deduct tokens from user
    user.tokens -= tokensToUse;
    await user.save();
    
    await bid.populate('bidder', 'username');
    
    // Emit real-time update
    io.emit('newBid', {
      productId,
      bid,
      newPrice: amount
    });
    
    res.json({ success: true, bid, newTokenBalance: user.tokens });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's bids
app.get('/api/my-bids', authenticateToken, async (req, res) => {
  try {
    const bids = await Bid.find({ bidder: req.user.userId })
      .populate('product')
      .sort({ timestamp: -1 });
    
    res.json(bids);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('joinAuction', (productId) => {
    socket.join(`auction_${productId}`);
  });
  
  socket.on('leaveAuction', (productId) => {
    socket.leave(`auction_${productId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});