# GigFlow - Freelance Marketplace Platform

A full-stack mini-freelance marketplace where clients can post jobs (Gigs) and freelancers can bid on them with real-time notifications using Socket.io.

## Project Structure

```
gigflow/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Gig.js
│   │   └── Bid.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── gigs.js
│   │   └── bids.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── gigsSlice.js
│   │   │   └── bidsSlice.js
│   │   ├── store/
│   │   │   └── store.js
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── GigsFeed.jsx
│   │   │   ├── GigDetail.jsx
│   │   │   ├── MyGigs.jsx
│   │   │   ├── MyBids.jsx
│   │   │   ├── PostGig.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
└── README.md
```

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **Security**: bcryptjs, cookie-parser, CORS

### Frontend
- **Framework**: React.js with Vite
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Routing**: React Router

## Features Implemented

### 1. User Authentication
- ✅ Secure registration with password hashing (bcryptjs)
- ✅ Login with JWT tokens stored in HttpOnly cookies
- ✅ Logout functionality
- ✅ Protected routes and middleware
- ✅ User profile management

### 2. Gig Management (CRUD)
- ✅ Browse all open gigs with pagination
- ✅ Search gigs by title and description
- ✅ Filter by category
- ✅ Post new gigs (clients)
- ✅ Edit own gigs
- ✅ Delete own gigs
- ✅ View gig details with bid count

### 3. Bidding System
- ✅ Submit bids on open gigs
- ✅ View all bids for own gigs (owner only)
- ✅ View submitted bids history
- ✅ Delete pending bids
- ✅ Prevent duplicate bids from same freelancer

### 4. Hiring Logic (Critical)
- ✅ Client can hire freelancer from bid list
- ✅ Atomic transaction processing (MongoDB transactions)
- ✅ Race condition prevention (using transactions)
- ✅ Automatic rejection of other bids when one is hired
- ✅ Gig status changes from "open" to "assigned"
- ✅ Real-time notification to hired freelancer

### 5. Real-time Features (Bonus)
- ✅ Socket.io integration for real-time notifications
- ✅ Instant notification when freelancer is hired
- ✅ No page refresh needed for updates
- ✅ User connection tracking

### 6. Security Features
- ✅ JWT authentication with token expiration
- ✅ HttpOnly cookies for secure token storage
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Request validation and sanitization
- ✅ Authorization checks for protected resources
- ✅ MongoDB transaction support for atomic operations

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your values
# MONGODB_URI=mongodb://localhost:27017/gigflow
# JWT_SECRET=your_secret_key
# PORT=5000
# FRONTEND_URL=http://localhost:5173

# Start server
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Update .env with your values
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

## API Endpoints

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login & set HttpOnly Cookie
POST   /api/auth/logout         - Logout & clear cookie
GET    /api/auth/me             - Get current user
PUT    /api/auth/profile        - Update user profile
```

### Gigs
```
GET    /api/gigs                - Fetch all open gigs (with search/filter)
GET    /api/gigs/my-gigs        - Fetch user's own gigs
GET    /api/gigs/:gigId         - Fetch single gig details
POST   /api/gigs                - Create new gig
PUT    /api/gigs/:gigId         - Update gig
DELETE /api/gigs/:gigId         - Delete gig
```

### Bids
```
POST   /api/bids                - Submit bid on gig
GET    /api/bids/gig/:gigId     - Get all bids for gig (owner only)
GET    /api/bids/my-bids        - Get user's submitted bids
PATCH  /api/bids/:bidId/hire    - Hire freelancer (with transaction)
DELETE /api/bids/:bidId         - Delete pending bid
```

## Database Schema

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String,
  bio: String,
  skills: [String],
  hourlyRate: Number,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Gig
```javascript
{
  title: String (required),
  description: String (required),
  budget: Number (required),
  category: String (enum),
  status: String (open, assigned, completed, cancelled),
  ownerId: ObjectId (ref: User),
  ownerName: String,
  hiredFreelancerId: ObjectId (ref: User),
  deadline: Date,
  bidCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Bid
```javascript
{
  gigId: ObjectId (ref: Gig),
  freelancerId: ObjectId (ref: User),
  freelancerName: String,
  message: String (required),
  price: Number (required),
  status: String (pending, hired, rejected),
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features & Implementation Details

### 1. Atomic Transactions (Race Condition Prevention)
The hiring logic uses MongoDB transactions to ensure atomicity:
- Only one freelancer can be hired even with simultaneous clicks
- If two admins hire different freelancers at the same time, only one succeeds
- All other bids are atomically marked as rejected
- Gig status is atomically updated to "assigned"

### 2. Real-time Notifications
Socket.io implementation:
- User login maps userId to socket ID
- When freelancer is hired, they receive instant notification
- Notification includes gig title, client name, and price
- No page refresh required

### 3. Error Handling
- Input validation on both client and server
- Custom error middleware
- User-friendly error messages
- Proper HTTP status codes

### 4. Pagination
- Gigs and bids support pagination
- Configurable page size
- Total count and pages returned

## Running the Application

### Development Mode

**Terminal 1 (Backend)**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend)**
```bash
cd frontend
npm run dev
```

Access the application at `http://localhost:5173`

### Production Build

```bash
# Backend
npm start

# Frontend
npm run build
npm run preview
```

## Testing the Hiring Flow

1. **Register as Client**: Create account and login
2. **Post a Gig**: Click "Post Gig" and fill in details
3. **Register as Freelancer**: Use different account/email
4. **Browse Gigs**: View the posted gig
5. **Submit Bid**: Click "Bid" and enter amount/message
6. **Hire Freelancer**: 
   - Go back to client account
   - Navigate to "My Gigs"
   - View gig details and click "Hire" on desired bid
   - Observe real-time notification in freelancer's dashboard

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_super_secret_jwt_key_change_in_production
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Package Dependencies

### Backend
```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "socket.io": "^4.6.0",
  "dotenv": "^16.0.0"
}
```

### Frontend
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "redux": "^4.2.0",
  "@reduxjs/toolkit": "^1.9.0",
  "axios": "^1.3.0",
  "socket.io-client": "^4.6.0",
  "tailwindcss": "^3.0.0"
}
```

## Bonus Features Completed

### ✅ Bonus 1: Transactional Integrity
- MongoDB transactions implemented in hiring logic
- Race condition prevention with atomic updates
- Prevents multiple hires of same gig

### ✅ Bonus 2: Real-time Updates
- Socket.io integration complete
- Real-time hiring notifications
- User connection mapping for targeted notifications

## Security Considerations

1. **Authentication**: JWT tokens with 7-day expiration
2. **Storage**: HttpOnly cookies prevent XSS attacks
3. **Passwords**: Hashed with bcryptjs (salt rounds: 10)
4. **CORS**: Configured for frontend origin
5. **Validation**: Input sanitization on all endpoints
6. **Authorization**: Role-based access (owner checks)
7. **Transactions**: Prevents race conditions

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check Atlas connection string
- Verify MONGODB_URI in .env file

### CORS Error
- Check FRONTEND_URL matches your frontend origin
- Ensure credentials: true in axios configuration

### Socket.io Not Working
- Verify Socket.io is running on backend
- Check browser console for connection errors
- Ensure port 5000 is accessible

### Token Expired
- Clear cookies and log in again
- Check JWT_SECRET is consistent between sessions

## Submission Checklist

- ✅ GitHub Repository with complete source code
- ✅ README.md with setup instructions
- ✅ .env.example file with all required variables
- ✅ Atomic transaction implementation
- ✅ Real-time Socket.io notifications
- ✅ All CRUD operations for Gigs
- ✅ Bidding system with status management
- ✅ Protected routes and proper error handling
- ✅ Proper database schema with relationships

## Video Demo Instructions

Record a 2-minute Loom video demonstrating:
1. User registration and login (0:00-0:15)
2. Posting a gig as client (0:15-0:30)
3. Browsing and bidding as freelancer (0:30-0:45)
4. Viewing bids and hiring freelancer (0:45-1:15)
5. Real-time notification display (1:15-2:00)

## License

MIT License - Feel free to use for educational purposes

## Support

For questions or issues, please refer to the documentation or create an issue in the repository.