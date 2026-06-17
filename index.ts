import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Dashboard stats - calculate from database
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    // For demo: return mock stats (will be calculated from real data later)
    const stats = {
      totalRevenue: 364800,
      totalExpenses: 142500,
      profitLoss: 222300,
      pendingInvoices: 8,
      cash_flow: 89200,
      currency: 'INR',
    }
    res.json(stats)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

// Get all invoices
app.get('/api/invoices', async (req, res) => {
  try {
    // Demo: return mock data
    const invoices = [
      { id: 1, number: 'INV-2026-0001', client: 'ACME Corp', amount: 72400, status: 'Paid', date: '2026-06-10' },
      { id: 2, number: 'INV-2026-0002', client: 'Tech Solutions', amount: 48500, status: 'Sent', date: '2026-06-08' },
      { id: 3, number: 'INV-2026-0003', client: 'Global Services', amount: 120000, status: 'Draft', date: '2026-06-15' },
    ]
    res.json(invoices)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch invoices' })
  }
})

// Create new invoice
app.post('/api/invoices', async (req, res) => {
  try {
    const { client, amount, date } = req.body
    const invoiceNum = 'INV-2026-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0')
    
    const newInvoice = {
      id: Date.now(),
      number: invoiceNum,
      client,
      amount,
      status: 'Draft',
      date,
    }
    res.json(newInvoice)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create invoice' })
  }
})

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = [
      { id: 1, vendor: 'Office Supplies Co', amount: 8900, category: 'Office Supplies', date: '2026-06-08', status: 'Pending' },
      { id: 2, vendor: 'Travel Agency', amount: 5100, category: 'Travel', date: '2026-06-05', status: 'Approved' },
      { id: 3, vendor: 'Cloud Services', amount: 12500, category: 'Software', date: '2026-06-12', status: 'Approved' },
    ]
    res.json(expenses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch expenses' })
  }
})

// Create new expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { vendor, amount, category, date } = req.body
    
    const newExpense = {
      id: Date.now(),
      vendor,
      amount,
      category,
      date,
      status: 'Pending',
    }
    res.json(newExpense)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create expense' })
  }
})

// Get recent transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = [
      { id: 1, description: 'Client payment - ACME Corp', date: '2026-06-10', category: 'Revenue', amount: 72400 },
      { id: 2, description: 'Office supplies purchase', date: '2026-06-08', category: 'Office Supplies', amount: -8900 },
      { id: 3, description: 'Travel expense - Mumbai', date: '2026-06-05', category: 'Travel', amount: -5100 },
      { id: 4, description: 'Client payment - Tech Solutions', date: '2026-06-15', category: 'Revenue', amount: 48500 },
    ]
    res.json(transactions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch transactions' })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🎯 Accounting API running on http://localhost:${PORT}`)
  console.log(`Database: ${process.env.DATABASE_URL}`)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit()
})
