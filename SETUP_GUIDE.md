# Blitzs Platform - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or MongoDB Atlas) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

## 🚀 Quick Start

### Step 1: Install Dependencies

Open your terminal and navigate to the project root directory:

```bash
cd c:/Users/ashwi/OneDrive/Desktop/Blitz
```

Install all dependencies (this will install for root, client, and server):

```bash
npm install
cd client
npm install
cd ../server
npm install
cd ..
```

### Step 2: Configure Environment Variables

The server already has a `.env` file configured. If you need to modify it:

**Server Environment (`server/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blitzs
JWT_SECRET=blitzs_super_secret_jwt_key_2024_change_in_production
NODE_ENV=development
```

**For MongoDB Atlas (Cloud Database):**
Replace `MONGODB_URI` with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blitzs?retryWrites=true&w=majority
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get your connection string
- Update the `.env` file

### Step 4: Seed Sample Data

Populate the database with sample projects, users, and developers:

```bash
cd server
node seedData.js
```

This will create:
- **Admin Account:** admin@blitzs.dev / admin123
- **User Account:** user@blitzs.dev / user123
- 8 sample projects
- 4 sample developers

### Step 5: Start the Application

**Option A: Run Both Servers Simultaneously (Recommended)**

From the root directory:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend server on http://localhost:3000

**Option B: Run Servers Separately**

Terminal 1 (Backend):
```bash
cd server
npm start
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

### Step 6: Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health

## 👥 Default Accounts

### Admin Account
- **Email:** admin@blitzs.dev
- **Password:** admin123
- **Access:** Full admin dashboard, manage projects, developers, requests, purchases

### User Account
- **Email:** user@blitzs.dev
- **Password:** user123
- **Access:** User dashboard, purchase projects, view purchases

## 📁 Project Structure

```
Blitz/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Context providers (Auth, Theme)
│   │   ├── pages/         # Page components
│   │   │   ├── admin/     # Admin dashboard pages
│   │   │   └── ...        # Public pages
│   │   ├── utils/         # API utilities
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
│
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── index.js          # Server entry point
│   ├── seedData.js       # Database seeding script
│   └── package.json
│
├── package.json          # Root package.json
└── README.md
```

## 🎯 Features Overview

### Public Features
- ✅ Browse projects with search and filters
- ✅ View detailed project information
- ✅ Contact form for custom projects
- ✅ User registration and login
- ✅ Dark/Light mode toggle
- ✅ Responsive design
- ✅ How-to-use guide

### User Features
- ✅ Purchase projects
- ✅ View purchased projects
- ✅ Download project files
- ✅ User profile management
- ✅ Purchase history

### Admin Features
- ✅ Dashboard with statistics
- ✅ Add/Edit/Delete projects
- ✅ Manage developers
- ✅ View and manage client requests
- ✅ View all purchases
- ✅ Revenue tracking

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects (with filters)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Developers
- `GET /api/developers` - Get all developers
- `POST /api/developers` - Create developer (Admin)
- `PUT /api/developers/:id` - Update developer (Admin)
- `DELETE /api/developers/:id` - Delete developer (Admin)

### Contact Requests
- `POST /api/contact` - Create contact request
- `GET /api/contact` - Get all requests (Admin)
- `PUT /api/contact/:id` - Update request (Admin)
- `DELETE /api/contact/:id` - Delete request (Admin)

### Purchases
- `POST /api/purchases` - Create purchase (User)
- `GET /api/purchases/my-purchases` - Get user purchases (User)
- `GET /api/purchases` - Get all purchases (Admin)

### Statistics
- `GET /api/stats` - Get admin statistics (Admin)

## 🎨 Customization

### Change Theme Colors

Edit `client/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize your primary colors
      }
    }
  }
}
```

### Add New Project Categories

Edit `server/models/Project.js`:
```javascript
category: {
  type: String,
  enum: ['Web Development', 'Mobile App', 'Your New Category', ...]
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Ensure backend is running on port 5000
- Check CORS configuration in `server/index.js`

## 📦 Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Deploy server folder
3. Update MongoDB URI to production database

### Frontend (Vercel/Netlify)
1. Update API URLs in `client/src/utils/api.js`
2. Build: `npm run build`
3. Deploy build folder

## 🔐 Security Notes

**Before Production:**
- Change JWT_SECRET to a strong random string
- Use environment variables for all secrets
- Enable HTTPS
- Implement rate limiting
- Add input validation
- Set up proper CORS policies
- Use secure password hashing (already implemented)

## 📞 Support

For issues or questions:
- Check the "How To Use" page in the application
- Review this setup guide
- Contact: contact@blitzs.dev

## 📄 License

MIT License - Feel free to use this project for your own purposes.

---

**Happy Coding! 🚀**
