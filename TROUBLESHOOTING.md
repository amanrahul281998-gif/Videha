# Troubleshooting Guide

## Issue: Backend not starting

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Kill process on port 5000
# Windows (PowerShell as Admin):
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Then start backend again
cd backend
npm start
```

---

## Issue: "Cannot find module 'express'"

**Error**: `Error: Cannot find module 'express'`

**Solution**:
```bash
cd backend
npm install express cors dotenv node-fetch
```

---

## Issue: OTP not arriving on phone

**Possible causes:**

1. **Backend not running**
   - Check if `http://localhost:5000` is accessible
   - Browser console shows: `POST http://localhost:5000/api/send-otp Failed to fetch`
   - **Fix**: Start backend: `cd backend && npm start`

2. **Wrong phone number**
   - Phone should be 10 digits for Indian numbers
   - **Fix**: Enter like `9876543210` or `+919876543210`

3. **Fast2SMS API key invalid**
   - Check `backend/.env` has correct API key
   - **Fix**: Verify key: `BfJKY5R0A6c2H7WiUQT3Lasm4V8NMIuzjyEqxgwGZnoCPtDdObyXb7puYJ09hW3FkBUmIrDM8wClfaNL`

4. **Backend logs show error**
   - Check backend terminal for error messages
   - **Common**: `Invalid sender ID`, `DLT template not approved`
   - **Fix**: Verify credentials in `backend/.env`

**Debug**: Check backend logs while sending OTP

---

## Issue: Logo triangle not showing

**Symptom**: Shows blank space or old logo instead of ▽

**Solution**:
```bash
# Hard refresh browser
# Windows/Linux: Ctrl+Shift+R
# Mac: Cmd+Shift+R

# Or clear cache:
# Chrome: DevTools > Application > Clear Storage > Clear All
```

**Still not working?**
- Check: `src/screens/SplashScreen.jsx` line 34
- Should have: `<Text style={styles.triangleLogo}>▽</Text>`

---

## Issue: "CORS policy: blocked"

**Appears**: Only if calling Fast2SMS directly from frontend (should not happen with new setup)

**Verify**: Check `src/services/otpService.js`
- Should call: `http://localhost:5000/api/send-otp`
- NOT: `https://www.fast2sms.com/dev/bulk`

---

## Issue: "localStorage not defined"

**This should NOT happen on web**

**Cause**: Running on non-web platform trying to use web code

**Check**: Environment
```javascript
// This runs in storage.js
const isWeb = typeof window !== 'undefined' && !globalThis.nativeEvent;
```

**Fix**: Make sure running with `npm run web` not `npm start` (Expo native)

---

## Issue: OTP shows but login fails

**Symptom**: OTP displays correctly, but after entering it, login fails

**Possible causes:**

1. **OTP mismatch**
   - Check: OTP in alert matches what you enter
   - Storage not syncing between requests
   - **Fix**: Make sure storage.js working correctly

2. **Supabase not connected**
   - Check `src/services/supabase.js` has correct credentials
   - **Fix**: Verify Supabase URL and anon key in credentials

3. **Session not stored**
   - Phone number not saved with OTP
   - **Fix**: Check browser DevTools > Application > LocalStorage
   - Should have: `phone_${sessionId}` and `otp_${sessionId}`

**Debug**: Open DevTools and check localStorage:
```javascript
// In console
localStorage.getItem('phone_*')  // Should show phone number
localStorage.getItem('otp_*')    // Should show OTP
```

---

## Issue: Multiple instances of backend/frontend

**Problem**: Ports already in use

**Verify active processes:**
```bash
# Windows (PowerShell):
Get-NetTCPConnection | Where-Object {$_.LocalPort -in 3000, 5000} | Select-Object LocalPort, @{Name='Process';Expression={(Get-Process -Id $_.OwningProcess).ProcessName}}

# Mac/Linux:
lsof -i :3000 -i :5000
```

**Kill and restart:**
```bash
# Windows:
Get-Process -Name node | Stop-Process -Force

# Mac/Linux:
killall node
```

---

## Issue: Package version conflicts

**Error**: `npm ERR! peer dep missing`

**Solution**:
```bash
# Force install ignoring peer deps
npm install --legacy-peer-deps

# Or specifically for backend
cd backend
npm install --legacy-peer-deps
```

---

## Issue: Phone number format

**Examples that work:**
- `9876543210` (10 digits)
- `+919876543210` (full with country code)
- `919876543210` (country code prefix)

**Examples that fail:**
- `98765 43210` (spaces)
- `+91-9876543210` (dashes)
- `09876543210` (leading zero)

---

## Quick Diagnostics

Run this in browser console to check setup:

```javascript
// Check localStorage available
console.log('localStorage:', typeof localStorage !== 'undefined');

// Check backend URL
console.log('Backend:', process.env.REACT_APP_BACKEND_URL);

// Check if backend is accessible
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log('Backend status:', d))
  .catch(e => console.log('Backend error:', e.message));

// Check stored OTP/phone
console.log('Stored data:', {
  phone: Object.keys(localStorage).find(k => k.includes('phone')),
  otp: Object.keys(localStorage).find(k => k.includes('otp'))
});
```

---

## Still Not Working?

**Check in order:**

1. ✅ Backend running? 
   - Terminal shows: `Backend server running on port 5000`

2. ✅ Frontend running?
   - Browser at: `http://localhost:3000`

3. ✅ Dependencies installed?
   - Run: `npm install` (both folders)

4. ✅ Environment variables?
   - Frontend: `.env` with `REACT_APP_BACKEND_URL=http://localhost:5000`
   - Backend: `backend/.env` with Fast2SMS credentials

5. ✅ No errors in console?
   - Check: Browser DevTools > Console > Red errors
   - Check: Terminal for backend errors

6. ✅ Ports not blocked?
   - Try different ports if needed
   - Edit: `backend/server.js` (PORT), app.json (web port)

**If still stuck**: Check logs in both terminal windows for specific error messages.
