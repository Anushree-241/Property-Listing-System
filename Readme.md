# Property Listing System Backend

A full-featured backend API for managing property listings with advanced filtering, user authentication, favorites, recommendations, and caching using Redis. Built with Node.js and MongoDB.

## Features

- User registration and login (JWT based)
- CRUD operations on properties (with authorization)
- Advanced filtering on 10+ attributes
- Favorite properties (add/remove/view)
- Recommend properties to other users by email
- Caching with Redis for performance
- MongoDB Atlas integration
- Deployment on Render (or similar)

## Tech Stack

- Backend: Node.js (Express)
- Database: MongoDB (Atlas)
- Caching: Redis
- Authentication: JWT
- Deployment: Render

## Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/property-listing-backend.git  
cd property-listing-backend

### 2. Install dependencies

npm install

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

PORT=5000  
MONGO_URI=your_mongodb_atlas_connection_string  
JWT_SECRET=your_jwt_secret  
REDIS_HOST=your_redis_host  
REDIS_PORT=your_redis_port  
REDIS_PASSWORD=your_redis_password (if applicable)

## API Endpoints

### Auth

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and receive token

### Property

- GET /api/properties - List all properties (with filters)
- POST /api/properties - Create a property (auth required)
- PUT /api/properties/:id - Update property (only by creator)
- DELETE /api/properties/:id - Delete property (only by creator)

### Favorites

- POST /api/favorites - Add a favorite (auth required)
- GET /api/favorites - Get user's favorites
- DELETE /api/favorites/:id - Remove from favorites

### Recommendations

- POST /api/recommend - Recommend a property to a user by email
- GET /api/recommendations - View properties recommended to the user

## Redis Caching

Used to cache frequently accessed properties for optimized performance.

You can configure Redis with a free provider like Redis Cloud.

## Deployment

This app is deployed on Render:

https://property-listing-system-xxxx.onrender.com

Replace `xxxx` with your actual Render subdomain.

## Notes

- Only the user who created a property (via `createdBy`) can update/delete it.
- Emails are case-insensitive during recommendation.
- MongoDB Atlas IP whitelist must include your current IP (or use `0.0.0.0/0` during development).