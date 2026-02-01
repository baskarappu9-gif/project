# 🚀 PriceWatch - Installation & Setup Guide

## ⚠️ Prerequisites Required

Before running the PriceWatch platform, you need to install the following software:

---

## 1. Install Node.js (Required for Frontend & Backend)

### Download & Install:
1. Visit: https://nodejs.org/
2. Download **LTS version** (Long Term Support)
3. Run the installer
4. **Important**: Check "Add to PATH" during installation
5. Restart your terminal/command prompt

### Verify Installation:
```bash
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: 9.x.x or higher
```

---

## 2. Install MongoDB (Required for Backend Database)

### Option A: MongoDB Community Server (Recommended)

1. Visit: https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Run the installer
4. Choose "Complete" installation
5. **Important**: Install MongoDB as a Service
6. Install MongoDB Compass (GUI tool) when prompted

### Option B: MongoDB Atlas (Cloud - Free Tier)

1. Visit: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a free cluster
4. Get connection string
5. Update `backend/.env` with your Atlas connection string

### Verify MongoDB Installation:
```bash
mongod --version
# Should show MongoDB version

# Or check if MongoDB service is running:
# Windows: Services app -> Look for "MongoDB"
```

---

## 3. Python (Already Installed ✅)

Your Python 3.14.2 is already installed and working!

---

## 📦 Installation Steps (After Prerequisites)

### Step 1: Create Environment Files

**Backend (.env)**
Already created at: `C:\Users\prade\OneDrive\Documents\project\backend\.env`

**Frontend (.env)**
Already created at: `C:\Users\prade\OneDrive\Documents\project\frontend\.env`

**ML Service (.env)**
Already created at: `C:\Users\prade\OneDrive\Documents\project\ml-service\.env`

---

### Step 2: Install Dependencies

Once Node.js is installed, run these commands:

#### Backend Dependencies:
```bash
cd C:\Users\prade\OneDrive\Documents\project\backend
npm install
```

#### Frontend Dependencies:
```bash
cd C:\Users\prade\OneDrive\Documents\project\frontend
npm install
```

#### ML Service Dependencies (Installing now...):
```bash
cd C:\Users\prade\OneDrive\Documents\project\ml-service
pip install -r requirements.txt
```

---

### Step 3: Train ML Models (First Time Only)

```bash
cd C:\Users\prade\OneDrive\Documents\project\ml-service
python models/train_model.py
```

This will:
- Generate training data
- Train Random Forest model
- Train XGBoost model
- Save models to `models/saved_models/`

---

### Step 4: Start MongoDB

#### If installed as Windows Service:
MongoDB should already be running. Verify in Services app.

#### If not running as service:
```bash
# Open new terminal as Administrator
mongod
```

---

### Step 5: Run All Services

Open **3 separate terminal windows**:

#### Terminal 1 - Backend API:
```bash
cd C:\Users\prade\OneDrive\Documents\project\backend
npm start
```
**Runs on**: http://localhost:5001

#### Terminal 2 - ML Service:
```bash
cd C:\Users\prade\OneDrive\Documents\project\ml-service
python app.py
```
**Runs on**: http://localhost:5000

#### Terminal 3 - Frontend:
```bash
cd C:\Users\prade\OneDrive\Documents\project\frontend
npm start
```
**Runs on**: http://localhost:3000 (Opens automatically in browser)

---

## 🎯 Quick Test After Setup

Once all services are running:

1. **Open browser**: http://localhost:3000
2. **Click "Sign Up"**
3. **Create an account**:
   - Full Name: Test User
   - Email: test@example.com
   - Mobile: 9876543210
   - Password: Test@1234
4. **Login** with the same credentials
5. **Explore Dashboard** - See 4 property module cards
6. **Test AI Prediction** - Create a property to see ML in action

---

## 🔧 Troubleshooting

### Issue: "npm is not recognized"
**Solution**: Install Node.js and restart terminal

### Issue: "mongod is not recognized"
**Solution**: Install MongoDB or use MongoDB Atlas (cloud)

### Issue: "Module not found" errors
**Solution**: Run `npm install` in the respective directory

### Issue: Port already in use
**Solution**: 
```bash
# Windows - Kill process on port
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Issue: MongoDB connection failed
**Solution**: 
- Make sure MongoDB is running
- Check connection string in `backend/.env`
- If using Atlas, whitelist your IP address

---

## 📋 Current Status

✅ **Environment Files**: Created
✅ **Python**: Installed (3.14.2)
✅ **ML Dependencies**: Installing...
❌ **Node.js**: Not installed yet
❌ **MongoDB**: Not installed yet

---

## 🎓 After Installation

Once everything is installed and running:

1. **All services should be running simultaneously**:
   - Frontend on port 3000
   - Backend on port 5001
   - ML Service on port 5000
   - MongoDB on port 27017

2. **You can access**:
   - Application: http://localhost:3000
   - Backend API: http://localhost:5001
   - ML API: http://localhost:5000
   - MongoDB Compass: mongodb://localhost:27017

3. **Test the complete flow**:
   - Signup → Login → Dashboard → Create Property → AI Prediction

---

## 💾 Database Initialization

The database will be created automatically when you:
1. Start the backend server
2. Create your first user (signup)
3. MongoDB will create the `pricewatch` database

No manual database setup required!

---

## 📦 Alternative: Use Docker (Advanced)

If you have Docker installed:

```bash
cd C:\Users\prade\OneDrive\Documents\project
docker-compose up
```

This will start all services in containers automatically!

---

## 🌐 Download Links

- **Node.js**: https://nodejs.org/en/download/
- **MongoDB**: https://www.mongodb.com/try/download/community
- **MongoDB Compass**: https://www.mongodb.com/try/download/compass
- **MongoDB Atlas** (Cloud): https://www.mongodb.com/cloud/atlas/register

---

## 📞 Next Steps

1. **Install Node.js** from https://nodejs.org/
2. **Install MongoDB** from https://www.mongodb.com/
3. **Restart your terminal**
4. **Run the dependency installation commands**
5. **Train ML models**
6. **Start all services**
7. **Access http://localhost:3000**

---

**Ready to build amazing things! 🚀**
