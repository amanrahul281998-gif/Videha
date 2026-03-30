# Quick Reference - Videh App Fixed ✅

## 3 SIMPLE STEPS TO RUN

### Step 1: Install Dependencies
```bash
npm install
cd backend && npm install && cd ..
```

### Step 2: Start Backend (Terminal 1)
```bash
cd backend
npm start
```
✅ You should see: `Backend server running on port 5000`

### Step 3: Start Frontend (Terminal 2)
```bash
npm run web
```
✅ Browser opens at: http://localhost:3000

---

## What's Fixed

| Issue | Status | Solution |
|-------|--------|----------|
| Logo not showing triangle | ✅ FIXED | Using Unicode triangle (▽) |
| SecureStore errors on web | ✅ FIXED | Cross-platform storage (localStorage/SecureStore) |
| CORS blocking SMS API | ✅ FIXED | Backend API proxy handles Fast2SMS |
| OTP SMS not sending | ✅ FIXED | Backend routes SMS requests |

---

## Test OTP Login Flow

1. **Start both terminals** (steps above)
2. **Go to** http://localhost:3000
3. **See triangle logo** ▽ on splash screen ✅
4. **Click** "Login / Register"
5. **Enter phone** like `9876543210`
6. **Click** "Send OTP"
7. **Get SMS** with OTP on your phone
8. **Enter OTP** in app
9. **Login success** ✅

---

## Key Endpoints

| What | Where | Port |
|------|-------|------|
| Frontend App | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000 | 5000 |
| OTP Endpoint | POST /api/send-otp | 5000 |
| Health Check | GET /api/health | 5000 |

---

## File Locations

### Frontend Configuration
- **Environment**: `.env`
- **OTP Service**: `src/services/otpService.js`
- **Auth Context**: `src/context/AuthContext.jsx`
- **Cross-platform Storage**: `src/services/storage.js`
- **Splash Screen**: `src/screens/SplashScreen.jsx` (triangle logo)

### Backend Configuration
- **Server**: `backend/server.js`
- **Environment**: `backend/.env` (credentials)
- **Dependencies**: `backend/package.json`

---

## Credentials (Already Configured)

```
Fast2SMS API Key: BfJKY5R0A6c2H7WiUQT3Lasm4V8NMIuzjyEqxgwGZnoCPtDdObyXb7puYJ09hW3FkBUmIrDM8wClfaNL
Sender ID: VIDEHE
DLT Template: 1007181628875366114
```

---

## Common Issues & Fixes

**Backend won't start?**
```bash
# Port 5000 already in use
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000   # Windows (then taskkill)
```

**OTP not arriving?**
- ✅ Check backend terminal for errors
- ✅ Verify phone format: `9876543210` or `+919876543210`
- ✅ Ensure backend running on port 5000

**Logo not showing?**
```bash
# Hard refresh browser
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

**Storage errors?**
- Check browser DevTools > Application > LocalStorage
- Should have keys like: `phone_abc123`, `otp_abc123`

---

## For Deployment (Later)

When deploying to production:

1. **Backend**:
   - Deploy Express server to Heroku/Render/AWS
   - Add CORS origin: your-domain.com
   - Set PORT env variable

2. **Frontend**:
   - Build: `npm run build`
   - Set `REACT_APP_BACKEND_URL` to production backend URL
   - Deploy to Vercel/Netlify

3. **Environment**:
   - Move Fast2SMS credentials to secure env vars
   - Don't commit `.env` files to git

---

## Verification Checklist

Before testing:
- ✅ Backend running? (See `Backend server running on port 5000`)
- ✅ Frontend running? (Browser shows http://localhost:3000)
- ✅ No errors? (Check both terminals)
- ✅ Logo visible? (See ▽ on splash)
- ✅ Can enter phone? (PhoneAuth screen appears)
- ✅ Backend responds? (Try http://localhost:5000/api/health)

---

## Need Help?

**Full Guide**: See `SETUP_BACKEND.md`  
**Detailed Fixes**: See `FIXES_SUMMARY.md`  
**Troubleshooting**: See `TROUBLESHOOTING.md`

---

**Everything is ready! Just run Step 1, 2, 3 above and you're good to go!** 🚀
