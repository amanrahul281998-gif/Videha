#!/bin/bash

echo "🚀 Installing frontend dependencies..."
npm install

echo "🚀 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "✅ Dependencies installed!"
echo ""
echo "📋 To run the app:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm start"
echo ""
echo "Terminal 2 (Frontend):"
echo "  npm run web"
echo ""
echo "🌐 Open browser: http://localhost:3000"
