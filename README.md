# Inventory Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing inventory with authentication, real-time analytics, and a modern dark-themed UI.

## Features

- **Landing Page**: Modern landing page with navigation, services, about, and contact sections
- **Authentication**: JWT-based login system with secure password hashing
- **Dashboard**: Comprehensive dashboard with inventory analytics and charts
- **Inventory Management**: CRUD operations for inventory items
- **Real-time Analytics**: Charts and statistics using Chart.js
- **Modern UI**: Material UI with dark theme
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Material UI** - Component library
- **React Router** - Client-side routing
- **Chart.js** - Data visualization
- **Axios** - HTTP client

## Project Structure

```
inventory-management-system/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── server.js
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd inventory-management-system
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inventory_system
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

## Running the Application

### 1. Start the Backend Server
```bash
cd server
npm run dev
```
The server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server
```bash
cd client
npm start
```
The React app will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Inventory
- `GET /api/inventory` - Get all inventory items (protected)
- `GET /api/inventory/stats` - Get inventory statistics (protected)
- `POST /api/inventory` - Add new inventory item (protected)
- `PUT /api/inventory/:id` - Update inventory item (protected)
- `DELETE /api/inventory/:id` - Delete inventory item (protected)

## Usage

1. **Landing Page**: Visit the homepage to learn about the system
2. **Get Started**: Click "Get Started" to navigate to the login page
3. **Login**: Use your credentials to access the dashboard
4. **Dashboard**: View inventory analytics, charts, and statistics
5. **Manage Inventory**: Add, edit, or delete inventory items

## Default Test User

You can create a test user using the registration endpoint or run the user creation script:

```bash
cd server
node createUser.js
```

Default credentials:
```json
{
  "email": "dineth@gmail.com",
  "password": "dineth.123",
  "name": "Dineth"
}
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@inventorysystem.com or create an issue in the repository. 