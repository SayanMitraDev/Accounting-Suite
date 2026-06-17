# Run the Real Accounting App

## Backend (Node.js API Server)

1. Open terminal in `d:\project\account\backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   This will run on `http://localhost:3001`

## Frontend (Dashboard)

1. Open `d:\project\account\frontend\index.html` in Live Preview
2. The dashboard will automatically load data from the backend API at `http://localhost:3001/api`

## API Endpoints

- `GET /api/health` - Server health check
- `GET /api/dashboard/stats` - Dashboard KPIs (revenue, expenses, profit, pending invoices)
- `GET /api/transactions` - Recent financial transactions
- `GET /api/invoices` - List of invoices
- `POST /api/invoices` - Create new invoice
- `GET /api/expenses` - List of expenses
- `POST /api/expenses` - Create new expense

## Features Now Working

✅ Dashboard loads real data from backend
✅ Create invoices and expenses (stored in backend memory)
✅ View transaction history
✅ Full UI with sidebar navigation
✅ Real-time currency formatting
✅ CORS enabled for frontend-backend communication

## Next Steps

- Connect backend to PostgreSQL database (currently uses mock data)
- Add authentication (JWT)
- Add more endpoints for clients, vendors, accounts, reports
- Implement PDF export, email sending
- Add Claude AI integrations
