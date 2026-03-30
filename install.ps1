Write-Host "🚀 Installing frontend dependencies..." -ForegroundColor Cyan
npm install

Write-Host "🚀 Installing backend dependencies..." -ForegroundColor Cyan
Push-Location backend
npm install
Pop-Location

Write-Host "✅ Dependencies installed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 To run the app:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Terminal 1 (Backend):" -ForegroundColor Cyan
Write-Host "  cd backend; npm start" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 (Frontend):" -ForegroundColor Cyan
Write-Host "  npm run web" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Open browser: http://localhost:3000" -ForegroundColor Green
