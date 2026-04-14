# 🏗️ Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Internet                             │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴─────────────┐
        │                          │
    ┌───▼────┐              ┌─────▼──────┐
    │ Vercel │              │  Railway   │
    │ (CDN)  │              │ (Backend)  │
    │        │              │            │
    │Frontend│              │  API Server│
    │  App   │              │  Port 5000 │
    └────┬───┘              └─────┬──────┘
         │                        │
         │ HTTPS Requests         │ MongoDB Query
         │ GET /api/tasks         │
         │ POST /api/auth/login   │
         │                        │
         └────────────┬───────────┘
                      │
                  ┌───▼─────────────────┐
                  │  MongoDB Atlas      │
                  │  (Database)         │
                  │  Cloud Hosted       │
                  └─────────────────────┘
```

## Frontend Architecture (React)

### File Structure
```
frontend/
├── public/
│   └── index.html          # Main HTML file with Tailwind CDN
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx   # Login form
│   │   ├── RegisterPage.jsx# Registration form
│   │   └── DashboardPage.jsx # Main app page
│   ├── components/
│   │   ├── TaskCard.jsx    # Individual task component
│   │   └── TaskForm.jsx    # Add task form
│   ├── store/
│   │   ├── authStore.js    # Authentication state (Zustand)
│   │   └── taskStore.js    # Tasks state (Zustand)
│   ├── api/
│   │   └── taskService.js  # API calls (Axios)
│   ├── App.jsx             # Main router
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
└── package.json
```

### State Management Flow

```
User Action
    ↓
React Component (UI)
    ↓
Zustand Store (Global State)
    ↓
API Service (Axios)
    ↓
Backend Server
    ↓
Database (MongoDB)
```

### Data Flow Example: Create Task

```
TaskForm Component
    ↓ (User submits form)
handleSubmit()
    ↓
useTaskStore.addTask()
    ↓
POST /api/tasks (with JWT token)
    ↓
Backend receives request
    ↓
Verify JWT token
    ↓
Create Task in MongoDB
    ↓
Return new task
    ↓
Update Zustand store
    ↓
Component re-renders
    ↓
New task appears in UI
```

## Backend Architecture (Node.js/Express)

### File Structure
```
backend/
├── models/
│   ├── User.js             # User schema
│   └── Task.js             # Task schema
├── routes/
│   ├── auth.js             # Authentication routes
│   └── tasks.js            # Task CRUD routes
├── middleware/
│   └── auth.js             # JWT verification
├── server.js               # Express server setup
├── config.js               # Configuration management
├── .env                    # Environment variables
└── package.json
```

### Request Flow

```
Client Request (Axios)
    ↓
Express Server
    ↓
CORS Middleware
    ↓
Body Parser
    ↓
Route Handler
    ↓
Auth Middleware (if protected)
    ↓
Verify JWT Token
    ↓
Business Logic
    ↓
Mongoose Query
    ↓
MongoDB Operation
    ↓
Return Response
    ↓
Client receives JSON
```

### API Endpoints

#### Authentication Routes
```
POST /api/auth/register
  Body: { name, email, password }
  Response: { token, user }

POST /api/auth/login
  Body: { email, password }
  Response: { token, user }
```

#### Task Routes (Protected with JWT)
```
GET /api/tasks
  Headers: { Authorization: "Bearer {token}" }
  Response: [tasks]

POST /api/tasks
  Headers: { Authorization: "Bearer {token}" }
  Body: { title, description, priority, dueDate }
  Response: { newTask }

PUT /api/tasks/:id
  Headers: { Authorization: "Bearer {token}" }
  Body: { completed, priority, etc }
  Response: { updatedTask }

DELETE /api/tasks/:id
  Headers: { Authorization: "Bearer {token}" }
  Response: { message: "Task deleted" }
```

## Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (references User),
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication Flow

### Login Process
```
1. User enters credentials
2. POST /api/auth/login
3. Backend verifies password with bcrypt
4. Generate JWT token with userId
5. Send token to frontend
6. Frontend stores token in localStorage
7. All future requests include token in header
```

### Protected Route Flow
```
1. Frontend sends request with Authorization header
2. Backend receives request
3. Extract token from header
4. Verify token with JWT secret
5. If valid, extract userId
6. Proceed with request
7. If invalid, return 401 Unauthorized
```

## Technology Stack Details

### Frontend Technologies
- **React 18**: Component-based UI library
- **React Router**: Client-side routing
- **Zustand**: Lightweight state management
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework (via CDN)

### Backend Technologies
- **Express.js**: Web framework for Node.js
- **Mongoose**: MongoDB ODM (Object Document Mapper)
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation/verification
- **cors**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management

### Database
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Mongoose**: Schema validation and modeling

### Deployment
- **Vercel**: Frontend hosting with CDN
- **Railway**: Backend hosting with auto-scaling
- **MongoDB Atlas**: Database hosting

## Security Measures

1. **Password Security**
   - Passwords hashed with bcrypt
   - Salt rounds: 10

2. **Token Security**
   - JWT tokens signed with secret
   - Token expiration: 7 days
   - Stored in localStorage

3. **API Security**
   - Protected routes with JWT middleware
   - CORS enabled for frontend only
   - Input validation on both sides
   - Error handling without exposing sensitive data

4. **Data Security**
   - User isolation (each user only sees their data)
   - Database user with limited permissions
   - HTTPS enforced in production

## Scalability Considerations

### Current Architecture
- Single Express server
- Single MongoDB instance
- Stateless API (can scale horizontally)

### Future Scalability
- Add Redis for caching
- Implement database indexing
- Add API rate limiting
- Use message queues for async tasks
- Containerize with Docker
- Use load balancer for multiple instances

---

This architecture provides a solid foundation for a full-stack application with security, scalability, and maintainability in mind.