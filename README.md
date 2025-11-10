# DevDiary Backend API

A Node.js/Express.js backend API for a blog application with user authentication and post management functionality. Built with TypeScript, MongoDB, and deployable to AWS Lambda via Serverless Framework.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Yarn package manager
- Serverless Framework (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/waqas-ahmd/devdiary-backend
cd backend

# Install dependencies
yarn

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

## 📦 Scripts

### Development

```bash
# Start development server with hot reload
yarn dev
```

_Runs the server locally on http://localhost:3000 using tsx watch_

### Production Build

```bash
# Build TypeScript to JavaScript
yarn build
```

_Compiles TypeScript files to the `dist/` directory_

```bash
# Start production server
yarn start
```

_Builds and starts the server using compiled JavaScript_

### Local Serverless Development

```bash
# Start serverless offline (simulates AWS Lambda locally)
npx serverless offline
```

_Runs on http://localhost:8000 as configured in serverless.yml_

### Deployment

```bash
# Deploy to AWS Lambda
npx serverless deploy
```

```bash
# Deploy to specific stage
npx serverless deploy --stage production
```

```bash
# Remove deployment
npx serverless remove
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/devdiary
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
```

## 📚 API Documentation

Base URL: `http://localhost:8000` (development) or your deployed URL

### Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Endpoints

#### Register User

- **POST** `/api/users/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Login User

- **POST** `/api/users/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Get User Profile

- **GET** `/api/users/profile`
- **Auth:** Required
- **Description:** Get current user's profile information

### Post Endpoints

#### Create Post

- **POST** `/api/posts`
- **Auth:** Required
- **Body:**
  ```json
  {
    "title": "My Blog Post",
    "content": "Post content here...",
    "status": "draft" | "published",
    "featuredImage":"https://www.website.com/image.png",
    "tags":["first post", "new post"]
  }
  ```

#### Get User's Posts

- **GET** `/api/posts`
- **Auth:** Required
- **Description:** Get all posts created by the authenticated user

#### Get Public Posts

- **GET** `/api/posts/public`
- **Description:** Get all publicly available posts

#### Get Post by Handle

- **GET** `/api/posts/public/:handle`
- **Description:** Get a specific public post by its handle/slug

#### Search Posts

- **GET** `/api/posts/search?query=searchterm`
- **Description:** Search through posts

#### Get Post by ID

- **GET** `/api/posts/:id`
- **Auth:** Required
- **Description:** Get a specific post by ID (user must own the post)

#### Update Post

- **PUT** `/api/posts/:id`
- **Auth:** Required
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content...",
    "tags":["new tag", "previous tag"],
    "featuredImage":"https://www.website.com/image.png",
    "status":"published" | "draft"
  }
  ```

#### Delete Post

- **DELETE** `/api/posts/:id`
- **Auth:** Required
- **Description:** Delete a post (user must own the post)

### Root Endpoint

#### Health Check

- **GET** `/`
- **Response:**
  ```json
  {
    "message": "Welcome to DevDiary API"
  }
  ```

## 🏗️ Project Structure

```
src/
├── app.ts              # Express app configuration
├── lambda.ts           # AWS Lambda handler
├── server.ts           # Local server entry point
├── config/
│   └── database.ts     # MongoDB connection
├── controllers/
│   ├── post.ts         # Post-related logic
│   └── user.ts         # User-related logic
├── middleware/
│   └── authentication.ts # JWT authentication
├── models/
│   ├── post.ts         # Post data model
│   └── user.ts         # User data model
├── routes/
│   ├── post.ts         # Post routes
│   └── user.ts         # User routes
└── utils/
    ├── jwt.ts          # JWT utilities
    └── posts.ts        # Post utilities
```

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Deployment:** AWS Lambda via Serverless Framework
- **Development:** tsx for hot reloading

## 📝 Development Notes

### Local Development

- The app runs on port 8000 by default
- Hot reloading is enabled with `yarn dev`
- MongoDB connection is required for all endpoints

### Serverless Development

- Use `serverless offline` to test Lambda functions locally
- Runs on port 8000 as configured in `serverless.yml`
- Simulates AWS Lambda environment

### Authentication Flow

1. Register/Login to get JWT token
2. Include token in Authorization header for protected routes
3. Token contains user ID and expires based on JWT_SECRET configuration

### Database Models

- **User:** name, email, password (hashed)
- **Post:** title, content, handle, author, status, tags, featuredImage, timestamps

## 🚀 Deployment

This application is configured for AWS Lambda deployment using the Serverless Framework:

1. Configure AWS credentials
2. Run `serverless deploy`
3. API Gateway will provide the deployed URL
