const Inventory = require('../models/Inventory');

// Get all inventory items
const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(inventory);
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get inventory statistics for charts
const getInventoryStats = async (req, res) => {
  try {
    const stats = await Inventory.aggregate([
      { $match: { createdBy: req.user._id } },
      {
        $group: {
          _id: '$category',
          totalQuantity: { $sum: '$quantity' },
          totalValue: { $sum: { $multiply: ['$quantity', '$price'] } },
          count: { $sum: 1 }
        }
      }
    ]);

    const recentItems = await Inventory.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      categoryStats: stats,
      recentItems
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new inventory item
const addInventoryItem = async (req, res) => {
  try {
    const { name, category, quantity, price, description, location, supplier } = req.body;

    const inventory = new Inventory({
      name,
      category,
      quantity,
      price,
      description,
      location,
      supplier,
      createdBy: req.user._id
    });

    await inventory.save();
    res.status(201).json(inventory);
  } catch (error) {
    console.error('Add inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update inventory item
const updateInventoryItem = async (req, res) => {
  try {
    const { name, category, quantity, price, description, location, supplier } = req.body;

    const inventory = await Inventory.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      {
        name,
        category,
        quantity,
        price,
        description,
        location,
        supplier,
        lastUpdated: Date.now()
      },
      { new: true }
    );

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json(inventory);
  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete inventory item
const deleteInventoryItem = async (req, res) => {
  try {
    const inventory = await Inventory.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Delete inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single inventory item
const getInventoryItem = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json(inventory);
  } catch (error) {
    console.error('Get inventory item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllInventory,
  getInventoryStats,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryItem
}; 