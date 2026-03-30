# Render Deployment Guide

## Backend Deployment on Render

### Prerequisites
- Render account (https://render.com)
- GitHub repository with this code
- Environment variables configured

### Deployment Steps

1. **Connect to Render**
   - Go to https://dashboard.render.com
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - **Name**: videh-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free tier (or Pro for production)

3. **Environment Variables**
   - Set the following in Render dashboard:
     ```
     PORT=5000
     NODE_ENV=production
     FAST2SMS_API_KEY=your_api_key_here
     FAST2SMS_SENDER_ID=VIDEHE
     DLT_TEMPLATE_ID=your_dlt_template_id
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy on every push to main branch

### API Endpoints

After deployment, your backend will be available at:
```
https://videh-backend.onrender.com
```

### API Usage

**Send OTP**
```
POST /api/send-otp
Content-Type: application/json

{
  "phone": "9876543210",
  "otp": "123456"
}
```

**Health Check**
```
GET /api/health
```

### Important Notes

- Free tier instances spin down after 15 minutes of inactivity
- For production, upgrade to a paid plan
- All environment variables must be set in Render dashboard
- CORS is enabled for all origins (configure in production)

### Troubleshooting

1. **Service won't start**
   - Check logs in Render dashboard
   - Verify NODE_ENV=production
   - Check environment variables are set

2. **Port issues**
   - Port is automatically assigned, don't hardcode ports
   - Use process.env.PORT in code (already done)

3. **Build failures**
   - Ensure package.json dependencies are correct
   - Check for any secrets in code

### Monitoring

Monitor your backend:
- Logs: Available in Render dashboard
- Metrics: CPU, Memory usage
- Health: Automatic health checks every minute

### Next Steps

1. Update frontend API endpoint to: `https://videh-backend.onrender.com`
2. Set up production database if needed
3. Configure custom domain (optional)
4. Set up CI/CD notifications
