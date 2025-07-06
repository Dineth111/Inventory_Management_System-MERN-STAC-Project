// Express test server for frontend testing (no DB)
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// --- Mock Data ---
// User
const mockUser = {
  id: '1',
  name: 'Dineth',
  email: 'dineth@gmail.com',
  role: 'admin'
};
// Inventory
const mockInventory = [
  {
    _id: '1', name: 'Laptop', category: 'Electronics', quantity: 10, price: 999.99, description: 'High-performance laptop', location: 'Warehouse A', supplier: 'TechCorp', createdAt: new Date(), lastUpdated: new Date()
  },
  {
    _id: '2', name: 'Office Chair', category: 'Furniture', quantity: 25, price: 199.99, description: 'Ergonomic office chair', location: 'Warehouse B', supplier: 'FurnitureCo', createdAt: new Date(), lastUpdated: new Date()
  },
  {
    _id: '3', name: 'Notebooks', category: 'Books', quantity: 100, price: 5.99, description: 'Professional notebooks', location: 'Warehouse A', supplier: 'PaperCorp', createdAt: new Date(), lastUpdated: new Date()
  }
];
// Inventory stats
const mockStats = {
  categoryStats: [
    { _id: 'Electronics', totalQuantity: 10, totalValue: 9999.90, count: 1 },
    { _id: 'Furniture', totalQuantity: 25, totalValue: 4999.75, count: 1 },
    { _id: 'Books', totalQuantity: 100, totalValue: 599.00, count: 1 }
  ],
  recentItems: mockInventory.slice(0, 3)
};

// --- Routes ---
// Root
app.get('/', (req, res) => {
  res.json({ message: 'Test Inventory Management System API is running' });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Check credentials
  if (email === 'dineth@gmail.com' && password === 'dineth.123') {
    const token = jwt.sign(
      { userId: mockUser.id },
      'test_secret_key',
      { expiresIn: '24h' }
    );
    res.json({ message: 'Login successful', token, user: mockUser });
  } else {
    res.status(400).json({ message: 'Invalid email or password' });
  }
});

// Get current user
app.get('/api/auth/me', (req, res) => {
  res.json({ user: mockUser });
});

// Get all inventory
app.get('/api/inventory', (req, res) => {
  res.json(mockInventory);
});

// Get inventory stats
app.get('/api/inventory/stats', (req, res) => {
  res.json(mockStats);
});

// Add inventory item
app.post('/api/inventory', (req, res) => {
  const newItem = {
    _id: Date.now().toString(),
    ...req.body,
    createdAt: new Date(),
    lastUpdated: new Date()
  };
  mockInventory.push(newItem);
  res.status(201).json(newItem);
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📧 Test login: dineth@gmail.com`);
  console.log(`🔑 Test password: dineth.123`);
  console.log(`🌐 API: http://localhost:${PORT}`);
}); 