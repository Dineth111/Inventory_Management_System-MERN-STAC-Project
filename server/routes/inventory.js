const express = require('express');
const { 
  getAllInventory, 
  getInventoryStats, 
  addInventoryItem, 
  updateInventoryItem, 
  deleteInventoryItem,
  getInventoryItem 
} = require('../controllers/inventoryController');

const router = express.Router();

// Get all inventory items
router.get('/', getAllInventory);

// Get inventory statistics for charts
router.get('/stats', getInventoryStats);

// Get single inventory item
router.get('/:id', getInventoryItem);

// Add new inventory item
router.post('/', addInventoryItem);

// Update inventory item
router.put('/:id', updateInventoryItem);

// Delete inventory item
router.delete('/:id', deleteInventoryItem);

module.exports = router; 