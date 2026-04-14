# 🚀 Deployment Guide

## Prerequisites
- Node.js v14+
- MongoDB Atlas account (cloud database)
- Railway or Heroku account (backend hosting)
- Vercel account (frontend hosting)
- GitHub account with your repository

## 📦 Backend Deployment (Railway.app)

### Step 1: Prepare Backend

Make sure your `.env` is NOT committed:
```bash
# Verify .env is in .gitignore
cat .gitignore | grep "\.env"
```

### Step 2: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project

### Step 3: Deploy on Railway

1. Click "Deploy from GitHub repo"
2. Select your `personal-task-manager` repository
3. Configure root directory: Select `backend` folder
4. Click Deploy

### Step 4: Add Environment Variables

In Railway dashboard:
1. Go to your project settings
2. Add variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong random secret (generate one)
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: Your frontend URL (will update later)
   - `PORT`: `5000`

### Step 5: Get Backend URL

After deployment, Railway provides a public URL like:
```
https://your-backend-xyz.railway.app
```

Save this URL! You'll need it for the frontend.

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

Update `frontend/.env.production`:
```
REACT_APP_API_URL=https://your-backend-xyz.railway.app/api
```

Replace `your-backend-xyz.railway.app` with your actual Railway URL.

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### Step 3: Deploy on Vercel

1. Click "Add New..." → Project
2. Select your GitHub repository
3. Configure:
   - Framework: Next.js (will auto-detect as React)
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Install Command: `npm install`

### Step 4: Add Environment Variables

1. Before deploying, add:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-xyz.railway.app/api`

### Step 5: Deploy

Click "Deploy" and wait for completion.

### Step 6: Get Frontend URL

Vercel gives you a public URL like:
```
https://task-manager-xyz.vercel.app
```

### Step 7: Update Backend CORS

Go back to Railway dashboard:
1. Update `CORS_ORIGIN` variable to your Vercel URL
2. Redeploy backend

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create Account
- Go to [mongodb.com/cloud](https://www.mongodb.com/cloud)
- Create free account
- Verify email

### Step 2: Create Organization & Project
1. Create new organization
2. Create new project within organization

### Step 3: Create Cluster
1. Build a cluster
2. Select free tier (M0)
3. Choose cloud provider (AWS recommended)
4. Choose region closest to you
5. Create cluster (takes a few minutes)

### Step 4: Create Database User
1. Go to "Database Access"
2. Add new database user
3. Enter username and password
4. Save password safely!
5. Grant permissions: Read and write to any database

### Step 5: Whitelist IP Address
1. Go to "Network Access"
2. Add IP Address
3. Choose "Allow access from anywhere" (0.0.0.0/0) for testing
4. In production, use specific IPs only

### Step 6: Get Connection String
1. Go to "Clusters"
2. Click "Connect" button
3. Choose "Connect your application"
4. Copy connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority
```

5. Replace `username` and `password` with your database user credentials
6. Use this as `MONGODB_URI` in Railway

---

## ✅ Testing Production

### Test Frontend
1. Open your Vercel URL in browser
2. Test all features:
   - Register new account
   - Create tasks
   - Complete tasks
   - Delete tasks
   - Filter tasks
   - Logout and login

### Test Backend
1. Use Postman or similar tool
2. Test API endpoints:
   ```
   POST https://your-backend-xyz.railway.app/api/auth/register
   ```
3. Create a task and verify it's stored in MongoDB

### Check Logs
1. Railway: View logs in dashboard
2. Vercel: View logs in dashboard
3. MongoDB: Check in Atlas dashboard

---

## 🔧 Troubleshooting

### Frontend shows "Cannot connect to API"
**Solution:**
- Check `REACT_APP_API_URL` environment variable in Vercel
- Verify backend is running on Railway
- Check CORS settings in backend (.env `CORS_ORIGIN`)
- Test backend URL directly in browser

### Database connection errors
**Solution:**
- Verify MongoDB connection string is correct
- Check username and password in connection string
- Verify IP whitelist in MongoDB Atlas
- Check network connectivity

### Authentication fails in production
**Solution:**
- Verify `JWT_SECRET` is same in Railway as locally
- Check token expiration settings
- Verify cookies are not being blocked

### 502 Bad Gateway errors
**Solution:**
- Check Railway logs for backend errors
- Restart backend deployment
- Verify all environment variables are set
- Check database connection

---

## 🔄 Deployment Workflow

Whenever you make changes:

1. **Test locally** (ensure both servers work)
2. **Commit to GitHub**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

3. **Railway auto-deploys backend** (watch dashboard)
4. **Vercel auto-deploys frontend** (watch dashboard)
5. **Test in production**

---

## 🔐 Security Checklist

- [ ] `JWT_SECRET` is strong and unique
- [ ] Database passwords are strong
- [ ] `.env` files are NOT committed to GitHub
- [ ] Production uses HTTPS (automatic on Railway/Vercel)
- [ ] CORS only allows your frontend domain
- [ ] Database user has limited permissions
- [ ] Sensitive data is in environment variables, not hardcoded

---

## 📝 Production Environment Variables

### Backend (.env in Railway)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/task-manager
JWT_SECRET=your-strong-secret-key-generate-random
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### Frontend (.env.production in Vercel)
```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

---

## 🚀 Rollback Strategy

If something goes wrong:

1. **Check logs** in Railway/Vercel dashboard
2. **Identify the issue** (recent commit?)
3. **Revert if needed:**
   ```bash
   git revert HEAD
   git push origin main
   ```
4. **Or redeploy previous version** from dashboard
5. **Test thoroughly** before deploying again

---

## 📊 Monitoring

### Check Backend Logs
- Railway: Dashboard → Logs tab
- Look for errors and warnings

### Check Frontend Logs
- Vercel: Dashboard → Logs tab
- Browser console (F12 → Console)

### Check Database
- MongoDB Atlas → Collections
- Verify data is being stored

---

## 🎉 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Railway account created
- [ ] Backend deployed on Railway
- [ ] Railway environment variables set
- [ ] Vercel account created
- [ ] Frontend deployed on Vercel
- [ ] Vercel environment variables set
- [ ] Backend CORS updated with frontend URL
- [ ] All features tested in production
- [ ] Security checklist completed
- [ ] Monitoring in place

---

## 📞 Support

If you encounter issues:

1. **Check logs** first (Railway/Vercel)
2. **Verify environment variables** are correct
3. **Test locally** to isolate issues
4. **Check documentation** for the service (Railway, Vercel, MongoDB)
5. **Ask for help** if stuck

---

## 🎯 Your Deployment URLs (Save These!)

After successful deployment, you'll have:

```
Frontend: https://YOUR-VERCEL-URL.vercel.app
Backend:  https://YOUR-RAILWAY-URL.railway.app
Database: MongoDB Atlas (cloud)
```

Share the **Frontend URL** with friends to use your app!

---

Good luck with deployment! 🚀