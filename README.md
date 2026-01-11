# GigFlow - Freelance Marketplace Platform

GigFlow is a mini-freelance marketplace platform where clients can post jobs (Gigs) and freelancers can apply for them (Bids). This is the backend API built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure sign-up and login with JWT & HttpOnly cookies
- **Fluid Roles**: Any user can post jobs or bid on jobs
- **Gig Management**: Create, browse, and search for gigs
- **Bidding System**: Freelancers can submit bids with messages
- **Hiring Logic**: Clients can hire freelancers, automatically rejecting other bids
- **Protected Routes**: Authentication required for sensitive operations

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) with HttpOnly cookies
- **Password Hashing**: bcryptjs
- **Environment**: Dotenv

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd gigflow-backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file from `.env.example`
```bash
cp .env.example .env
```

4. Update `.env` with your configuration
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

5. Start the server
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |

### Gigs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/gigs` | Get all open gigs | No |
| GET | `/api/gigs?search=keyword` | Search gigs by title | No |
| GET | `/api/gigs/:id` | Get single gig | No |
| POST | `/api/gigs` | Create new gig | Yes |

### Bids

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/bids` | Submit a bid | Yes |
| GET | `/api/bids/:gigId` | Get all bids for a gig | Yes (Owner only) |
| PATCH | `/api/bids/:bidId/hire` | Hire a freelancer | Yes (Owner only) |

## Request/Response Examples

### Register
**Request:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Create Gig
**Request:**
```json
POST /api/gigs
{
  "title": "Build a React App",
  "description": "I need a React dashboard",
  "budget": 5000
}
```

**Response:**
```json
{
  "message": "Gig created successfully",
  "gig": {
    "_id": "gig_id",
    "title": "Build a React App",
    "description": "I need a React dashboard",
    "budget": 5000,
    "ownerId": "user_id",
    "status": "open",
    "createdAt": "2024-01-11T10:00:00Z"
  }
}
```

### Submit Bid
**Request:**
```json
POST /api/bids
{
  "gigId": "gig_id",
  "message": "I can do this in 2 weeks"
}
```

**Response:**
```json
{
  "message": "Bid submitted successfully",
  "bid": {
    "_id": "bid_id",
    "gigId": "gig_id",
    "freelancerId": "user_id",
    "message": "I can do this in 2 weeks",
    "status": "pending",
    "createdAt": "2024-01-11T10:05:00Z"
  }
}
```

### Hire Freelancer
**Request:**
```json
PATCH /api/bids/bid_id/hire
```

**Response:**
```json
{
  "message": "Freelancer hired successfully",
  "bid": {
    "_id": "bid_id",
    "gigId": "gig_id",
    "freelancerId": "user_id",
    "message": "I can do this in 2 weeks",
    "status": "hired",
    "createdAt": "2024-01-11T10:05:00Z"
  }
}
```

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  timestamps: true
}
```

### Gig
```javascript
{
  title: String,
  description: String,
  budget: Number,
  ownerId: ObjectId (ref: User),
  status: String (enum: ['open', 'assigned']),
  timestamps: true
}
```

### Bid
```javascript
{
  gigId: ObjectId (ref: Gig),
  freelancerId: ObjectId (ref: User),
  message: String,
  status: String (enum: ['pending', 'hired', 'rejected']),
  timestamps: true
}
```

## Key Features Explained

### Authentication Flow
1. User registers with name, email, and password
2. Password is hashed using bcryptjs
3. JWT token is generated and set in HttpOnly cookie
4. Token is verified on protected routes

### Hiring Logic
1. Freelancer submits a bid on an open gig
2. Gig owner reviews all pending bids
3. Owner clicks "Hire" on a bid
4. System updates:
   - Gig status: `open` → `assigned`
   - Selected bid status: `pending` → `hired`
   - Other bids status: `pending` → `rejected`

## Error Handling

The API handles the following error cases:
- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)

## Folder Structure

```
gigflow-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── gigController.js
│   └── bidController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Gig.js
│   └── Bid.js
├── routes/
│   ├── authRoutes.js
│   ├── gigRoutes.js
│   └── bidRoutes.js
├── utils/
│   └── tokenUtils.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Environment Variables

Create a `.env` file with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Future Enhancements

- MongoDB Transactions for race condition handling
- Socket.io for real-time notifications
- Payment integration
- Rating and review system
- User profile management

## Author

Built as an internship assignment for GigFlow platform.

## License

MIT
