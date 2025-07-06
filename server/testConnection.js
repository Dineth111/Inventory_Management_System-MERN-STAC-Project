const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory_system', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully!');

    // Check if user exists
    const user = await User.findOne({ email: 'dineth@gmail.com' });
    
    if (user) {
      console.log('✅ User found in database:');
      console.log('   Email:', user.email);
      console.log('   Name:', user.name);
      console.log('   Role:', user.role);
      
      // Test password
      const isPasswordValid = await user.comparePassword('dineth.123');
      console.log('   Password valid:', isPasswordValid);
    } else {
      console.log('❌ User not found in database');
      console.log('   Creating user now...');
      
      const newUser = new User({
        name: 'Dineth',
        email: 'dineth@gmail.com',
        password: 'dineth.123',
        role: 'admin'
      });

      await newUser.save();
      console.log('✅ User created successfully!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Solution: Make sure MongoDB is running!');
      console.log('   - Install MongoDB if not installed');
      console.log('   - Start MongoDB service');
      console.log('   - Or use MongoDB Atlas (cloud)');
    }
    
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

testConnection(); 