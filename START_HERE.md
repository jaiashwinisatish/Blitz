# 🚀 Quick Start - Blitzs Platform

## Get Started in 3 Steps!

### Step 1: Install Dependencies
```bash
cd server
npm install
cd ../client
npm install
```

### Step 2: Start MongoDB
Make sure MongoDB is running on your system.

**Windows:** Open MongoDB Compass or run `mongod` in terminal
**Mac/Linux:** Run `sudo systemctl start mongod`

### Step 3: Seed Data & Start Servers

**Terminal 1 - Seed Database:**
```bash
cd server
node seedData.js
```

**Terminal 2 - Start Backend:**
```bash
cd server
npm start
```

**Terminal 3 - Start Frontend:**
```bash
cd client
npm start
```

## 🎉 You're Ready!

Open http://localhost:3000 in your browser.

### Login Credentials:

**Admin Dashboard:**
- Email: `admin@blitzs.dev`
- Password: `admin123`

**User Dashboard:**
- Email: `user@blitzs.dev`
- Password: `user123`

## 📚 Need More Help?

See `SETUP_GUIDE.md` for detailed instructions.

---

**Enjoy building with Blitzs! 💙**
