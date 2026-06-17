# Accounting Web App

Full-stack accounting application scaffold with React frontend, Node.js/Express backend, PostgreSQL database, Prisma ORM, and Anthropic Claude AI integration.

## Structure

- `backend/` - Express API, Prisma schema, auth, AI integrations, email, PDF exports
- `frontend/` - Vite + React app, Tailwind CSS, Recharts, React Query, Zustand, AI assistant
- `prisma/` - Database schema and seeds

## Getting Started

### Backend

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env`
4. Set `DATABASE_URL`
5. `npx prisma generate`
6. `npx prisma db push`
7. `npm run dev`

### Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Notes

This repo is scaffolded for a production-ready accounting platform, including:
- multi-company user roles
- invoices, expenses, clients, vendors
- AI-powered transaction categorization, invoice description generation, receipt OCR, bank matching, report explanation
- double-entry ledger, financial reports, GST tax module
- PDF export, email sending, responsive UI
