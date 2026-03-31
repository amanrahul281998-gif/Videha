const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Videh Backend API is running',
    status: 'active',
    version: '1.0.0'
  });
});

// Constants
const FAST2SMS_API_KEY = 'BfJKY5R0A6c2H7WiUQT3Lasm4V8NMIuzjyEqxgwGZnoCPtDdObyXb7puYJ09hW3FkBUmIrDM8wClfaNL';
const SENDER_ID = 'VIDEHE';
const DLT_TEMPLATE_ID = '1007181628875366114';

// Send OTP via Fast2SMS
app.post('/api/send-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone and OTP are required'
      });
    }

    // Normalize phone number
    let normalizedPhone = phone.replace(/[^\d]/g, '');
    if (!normalizedPhone.startsWith('91')) {
      normalizedPhone = '91' + normalizedPhone;
    }

    const message = `Your Videh verification code is: ${otp}`;

    const response = await fetch('https://www.fast2sms.com/dev/bulk', {
      method: 'POST',
      headers: {
        'authorization': FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'dlt',
        sender_id: SENDER_ID,
        message: message,
        language: 'english',
        flash: 0,
        numbers: normalizedPhone,
        variables_values: otp,
        dlt_template_id: DLT_TEMPLATE_ID
      })
    });

    const data = await response.json();

    if (data.return) {
      res.json({
        success: true,
        message: 'OTP sent successfully',
        data: data
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send OTP',
        error: data
      });
    }
  } catch (error) {
    console.error('OTP send error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending OTP',
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
