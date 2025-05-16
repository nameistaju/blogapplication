
# Blog API Backend

This is the backend API for the Blog application built with Node.js, Express, and MongoDB.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   MONGO_URI=mongodb+srv://onepunchman86412:sohPTRNW3RThvS7m@blog.9jo1qap.mongodb.net/?retryWrites=true&w=majority&appName=blog
   PORT=5000
   JWT_SECRET=mySuperSecretKey123
   JWT_EXPIRE=30d
   ```

3. Run the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /auth/signup - Register a user
- POST /auth/login - Authenticate and get a JWT token
- GET /auth/verify - Verify token and get user details

### Blogs
- GET /blogs - Retrieve all blogs
- GET /blogs?category=:category&author=:author - Filter blogs
- POST /blogs - Create a blog
- PUT /blogs/:id - Update a blog
- DELETE /blogs/:id - Delete a blog
- GET /blogs/:id - Get a blog by ID

All endpoints require authentication except signup and login.
