# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free"
3. Create an account

## Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS/Google Cloud/Azure)
4. Choose a region close to you
5. Click "Create"

## Step 3: Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Username: `inventory_user`
4. Password: `inventory123`
5. Role: "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

## Step 6: Update .env File
Replace your .env file with:
```
PORT=5000
MONGODB_URI=mongodb+srv://inventory_user:inventory123@cluster0.xxxxx.mongodb.net/inventory_system?retryWrites=true&w=majority
JWT_SECRET=inventory_management_secret_key_2024
NODE_ENV=development
```

Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL.

## Step 7: Test Connection
```bash
node testConnection.js
```

## Step 8: Start Server
```bash
npm run dev
``` 