const API_BASE = 'http://localhost:3001/api'

export const api = {
  async getStats() {
    const res = await fetch(`${API_BASE}/dashboard/stats`)
    return res.json()
  },

  async getInvoices() {
    const res = await fetch(`${API_BASE}/invoices`)
    return res.json()
  },

  async createInvoice(data) {
    const res = await fetch(`${API_BASE}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  async getExpenses() {
    const res = await fetch(`${API_BASE}/expenses`)
    return res.json()
  },

  async createExpense(data) {
    const res = await fetch(`${API_BASE}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  async getTransactions() {
    const res = await fetch(`${API_BASE}/transactions`)
    return res.json()
  },
}
