# Running Videh App (Fixed Version)

## Fixed Issues
✅ **Logo Display** - Triangle logo (▽) now displays in splash screen  
✅ **SecureStore Error** - Created cross-platform storage utility (localStorage for web, SecureStore for mobile)  
✅ **CORS Error** - Created backend API proxy to handle Fast2SMS calls server-side  
✅ **OTP SMS** - Backend now handles all OTP sending via Fast2SMS  

## Setup Instructions

### 1. Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

### 2. Run Backend (In a separate terminal)

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

### 3. Run Frontend (In another terminal)

```bash
npm run web
```

The frontend will run on `http://localhost:3000`

## How It Works Now

1. **Storage**: 
   - Web: Uses `localStorage`
   - Mobile: Uses `expo-secure-store`
   - Abstracted via `src/services/storage.js`

2. **OTP SMS**:
   - Frontend calls backend: `POST /api/send-otp`
   - Backend calls Fast2SMS API (avoiding CORS issues)
   - OTP sent via SMS to user's phone

3. **Logo**:
   - Displays triangle character (▽) in a styled container
   - Works on all platforms

## Testing

1. Go to http://localhost:3000
2. Click "Login / Register"
3. Enter phone number (e.g., +919876543210)
4. Click "Send OTP"
5. Check your phone for SMS with OTP
6. Enter OTP to login

## Troubleshooting

**Backend not connecting?**
- Make sure backend is running on port 5000
- Check `.env` file has `REACT_APP_BACKEND_URL=http://localhost:5000`

**SMS not sending?**
- Check backend logs for Fast2SMS errors
- Verify Fast2SMS API key in `backend/.env`

**Logo not showing?**
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

## Environment Variables

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Backend (backend/.env)
```
PORT=5000
FAST2SMS_API_KEY=BfJKY5R0A6c2H7WiUQT3Lasm4V8NMIuzjyEqxgwGZnoCPtDdObyXb7puYJ09hW3FkBUmIrDM8wClfaNL
FAST2SMS_SENDER_ID=VIDEHE
DLT_TEMPLATE_ID=1007181628875366114
```
