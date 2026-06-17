const STORAGE_KEY = 'accountly-suite-state-v2'

const today = '2026-06-17'
const navList = document.getElementById('navList')
const content = document.getElementById('content')
const pageTitle = document.getElementById('pageTitle')
const pageSubtitle = document.getElementById('pageSubtitle')
const modal = document.getElementById('modal')

const pages = [
  { id: 'dashboard', label: 'Dashboard', icon: 'DB', subtitle: 'Cash, profit, receivables, payables, and attention items.' },
  { id: 'invoices', label: 'Invoices', icon: 'IN', subtitle: 'Create, send, collect, edit, print, and track customer invoices.' },
  { id: 'expenses', label: 'Expenses', icon: 'EX', subtitle: 'Capture bills, receipts, approvals, payment status, and vendor spend.' },
  { id: 'contacts', label: 'Contacts', icon: 'CO', subtitle: 'Clients, vendors, GSTINs, balances, email, and payment terms.' },
  { id: 'entries', label: 'Entries', icon: 'EN', subtitle: 'Post cash entries, bank entries, and journal entries from one place.' },
  { id: 'bank', label: 'Banking', icon: 'BK', subtitle: 'Import, add, match, and reconcile bank transactions.' },
  { id: 'ledger', label: 'Ledger', icon: 'GL', subtitle: 'Chart of accounts, journals, trial balance, and audit trail.' },
  { id: 'tax', label: 'Tax', icon: 'TX', subtitle: 'GST summaries, input credit review, liability, filing, and export.' },
  { id: 'reports', label: 'Reports', icon: 'RP', subtitle: 'Profit and loss, balance sheet, cash flow, aging, and exports.' },
  { id: 'settings', label: 'Settings', icon: 'ST', subtitle: 'Company profile, fiscal year, numbering, policy, and user access.' },
  { id: 'assistant', label: 'Assistant', icon: 'AI', subtitle: 'Accounting summaries, close checklist, and action recommendations.' },
]

let activePage = 'dashboard'
let state = loadState()

function seedState() {
  return {
    company: {
      name: 'Northstar Digital Pvt Ltd',
      gstin: '27AABCN1522G1Z9',
      fiscalYear: '2026-2027',
      currency: 'INR',
      invoicePrefix: 'INV-2026',
      expensePolicy: 'Manager approval above INR 25,000',
      address: 'Bandra Kurla Complex, Mumbai, Maharashtra',
      email: 'finance@northstar.example',
    },
    users: [
      { id: 'u1', name: 'Sayan Mitra', email: 'sayan@example.com', role: 'Admin', status: 'Active' },
      { id: 'u2', name: 'Finance Ops', email: 'ops@example.com', role: 'Accountant', status: 'Active' },
      { id: 'u3', name: 'Founder View', email: 'founder@example.com', role: 'Viewer', status: 'Invited' },
    ],
    clients: [
      { id: 'c1', name: 'ACME Corp', type: 'Client', email: 'finance@acme.example', phone: '+91 98765 00001', gstin: '29AAACA1234A1Z5', terms: 'Net 15', balance: 0 },
      { id: 'c2', name: 'Tech Solutions', type: 'Client', email: 'ap@techsolutions.example', phone: '+91 98765 00002', gstin: '27AAACT9087B1Z2', terms: 'Net 30', balance: 48500 },
      { id: 'c3', name: 'Global Services', type: 'Client', email: 'accounts@global.example', phone: '+91 98765 00003', gstin: '07AAACG4412C1ZP', terms: 'Net 30', balance: 120000 },
      { id: 'c4', name: 'Blue Peak Labs', type: 'Client', email: 'billing@bluepeak.example', phone: '+91 98765 00004', gstin: '27AAACB9911P1Z8', terms: 'Net 30', balance: 42480 },
    ],
    vendors: [
      { id: 'v1', name: 'Office Supplies Co', type: 'Vendor', email: 'billing@officeco.example', phone: '+91 98765 10001', gstin: '27AAACO2022Q1Z7', terms: 'Due on receipt', balance: 8900 },
      { id: 'v2', name: 'Cloud Services', type: 'Vendor', email: 'invoices@cloud.example', phone: '+91 98765 10002', gstin: '29AAACC3355P1ZX', terms: 'Auto debit', balance: 12500 },
      { id: 'v3', name: 'Travel Agency', type: 'Vendor', email: 'desk@travel.example', phone: '+91 98765 10003', gstin: '27AAACT7181R1Z4', terms: 'Net 7', balance: 0 },
      { id: 'v4', name: 'RentWorks', type: 'Vendor', email: 'rent@rentworks.example', phone: '+91 98765 10004', gstin: '27AAACR7812K1ZN', terms: 'Monthly', balance: 0 },
    ],
    invoices: [
      { id: 'i1', number: 'INV-2026-0001', client: 'ACME Corp', issueDate: '2026-06-01', dueDate: '2026-06-16', subtotal: 61356, tax: 11044, total: 72400, paid: 72400, status: 'Paid', notes: 'Monthly implementation retainer' },
      { id: 'i2', number: 'INV-2026-0002', client: 'Tech Solutions', issueDate: '2026-06-08', dueDate: '2026-07-08', subtotal: 41102, tax: 7398, total: 48500, paid: 0, status: 'Sent', notes: 'Product analytics sprint' },
      { id: 'i3', number: 'INV-2026-0003', client: 'Global Services', issueDate: '2026-06-15', dueDate: '2026-07-15', subtotal: 101695, tax: 18305, total: 120000, paid: 0, status: 'Draft', notes: 'Data platform migration' },
      { id: 'i4', number: 'INV-2026-0004', client: 'Blue Peak Labs', issueDate: '2026-05-12', dueDate: '2026-06-11', subtotal: 36000, tax: 6480, total: 42480, paid: 0, status: 'Overdue', notes: 'UX audit' },
    ],
    expenses: [
      { id: 'e1', vendor: 'Office Supplies Co', date: '2026-06-08', category: 'Office Supplies', reference: 'BILL-778', amount: 7542, tax: 1358, total: 8900, status: 'Pending', paid: false, notes: 'Workstation supplies' },
      { id: 'e2', vendor: 'Travel Agency', date: '2026-06-05', category: 'Travel', reference: 'TRV-221', amount: 5100, tax: 0, total: 5100, status: 'Approved', paid: true, notes: 'Mumbai client visit' },
      { id: 'e3', vendor: 'Cloud Services', date: '2026-06-12', category: 'Software', reference: 'CS-934', amount: 10593, tax: 1907, total: 12500, status: 'Approved', paid: false, notes: 'Hosting and observability' },
      { id: 'e4', vendor: 'RentWorks', date: '2026-06-01', category: 'Rent', reference: 'RNT-0601', amount: 38000, tax: 6840, total: 44840, status: 'Approved', paid: true, notes: 'Office lease' },
    ],
    accounts: [
      { id: 'a1', code: '1000', name: 'Cash and Bank', type: 'Asset', balance: 421900 },
      { id: 'a2', code: '1100', name: 'Accounts Receivable', type: 'Asset', balance: 210980 },
      { id: 'a3', code: '2000', name: 'Accounts Payable', type: 'Liability', balance: 21400 },
      { id: 'a4', code: '2100', name: 'GST Payable', type: 'Liability', balance: 20422 },
      { id: 'a5', code: '3000', name: 'Owner Equity', type: 'Equity', balance: 302000 },
      { id: 'a6', code: '4000', name: 'Service Revenue', type: 'Income', balance: 283380 },
      { id: 'a7', code: '5000', name: 'Operating Expenses', type: 'Expense', balance: 71340 },
    ],
    journals: [
      { id: 'j1', date: '2026-06-01', description: 'Invoice ACME Corp', debit: 'Accounts Receivable', credit: 'Service Revenue', amount: 72400, ref: 'INV-2026-0001' },
      { id: 'j2', date: '2026-06-10', description: 'ACME payment received', debit: 'Cash and Bank', credit: 'Accounts Receivable', amount: 72400, ref: 'BANK-1182' },
      { id: 'j3', date: '2026-06-12', description: 'Cloud Services bill', debit: 'Operating Expenses', credit: 'Accounts Payable', amount: 12500, ref: 'CS-934' },
    ],
    cashEntries: [
      { id: 'ce1', date: '2026-06-09', type: 'Receipt', account: 'Cash and Bank', description: 'Cash sales deposit', amount: 15000, ref: 'CASH-001' },
      { id: 'ce2', date: '2026-06-13', type: 'Payment', account: 'Operating Expenses', description: 'Petty cash office supplies', amount: 2200, ref: 'CASH-002' },
    ],
    bank: [
      { id: 'b1', date: '2026-06-10', description: 'NEFT ACME CORP', amount: 72400, matched: true, match: 'INV-2026-0001' },
      { id: 'b2', date: '2026-06-05', description: 'CARD TRAVEL AGENCY', amount: -5100, matched: true, match: 'TRV-221' },
      { id: 'b3', date: '2026-06-14', description: 'ACH CLOUD SERVICES', amount: -12500, matched: false, match: '' },
      { id: 'b4', date: '2026-06-16', description: 'UPI OFFICE SUPPLIES', amount: -8900, matched: false, match: '' },
      { id: 'b5', date: '2026-06-17', description: 'BANK FEE', amount: -590, matched: false, match: '' },
    ],
    tax: {
      filingStatus: 'Draft ready',
      period: 'June 2026',
      dueDate: '2026-07-20',
      itcReviewed: false,
      filed: false,
    },
  }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return recalculate({ ...seedState(), ...(saved || {}) })
  } catch {
    return recalculate(seedState())
  }
}

function saveState() {
  state = recalculate(state)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function recalculate(next) {
  const data = structuredClone(next)
  const receivables = new Map()
  const payables = new Map()

  data.invoices.forEach((invoice) => {
    if (invoice.items?.length) {
      invoice.items = invoice.items.map((item) => ({
        description: item.description || 'Item',
        quantity: num(item.quantity),
        unitPrice: num(item.unitPrice),
        cgstRate: num(item.cgstRate),
        sgstRate: num(item.sgstRate),
      }))
      invoice.subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
      invoice.cgst = invoice.items.reduce((sum, item) => sum + Math.round(item.quantity * item.unitPrice * item.cgstRate / 100), 0)
      invoice.sgst = invoice.items.reduce((sum, item) => sum + Math.round(item.quantity * item.unitPrice * item.sgstRate / 100), 0)
      invoice.tax = invoice.cgst + invoice.sgst
      invoice.total = invoice.subtotal + invoice.tax
    } else {
      invoice.subtotal = num(invoice.subtotal)
      invoice.tax = num(invoice.tax)
      invoice.total = num(invoice.total || invoice.subtotal + invoice.tax)
      invoice.cgst = invoice.cgst || Math.round(invoice.tax / 2)
      invoice.sgst = invoice.sgst || Math.round(invoice.tax / 2)
    }
    invoice.paid = Math.min(num(invoice.paid), invoice.total)
    if (invoice.paid >= invoice.total) invoice.status = 'Paid'
    if (invoice.status !== 'Paid' && daysPastDue(invoice.dueDate) > 0) invoice.status = 'Overdue'
    receivables.set(invoice.client, (receivables.get(invoice.client) || 0) + Math.max(0, invoice.total - invoice.paid))
  })

  data.expenses.forEach((expense) => {
    expense.amount = num(expense.amount)
    expense.tax = num(expense.tax)
    expense.total = num(expense.total || expense.amount + expense.tax)
    payables.set(expense.vendor, (payables.get(expense.vendor) || 0) + (expense.paid ? 0 : expense.total))
  })

  data.clients = data.clients.map((client) => ({ ...client, balance: receivables.get(client.name) || 0 }))
  data.vendors = data.vendors.map((vendor) => ({ ...vendor, balance: payables.get(vendor.name) || 0 }))

  const t = rawTotals(data)
  data.accounts = data.accounts.map((account) => {
    if (account.name === 'Accounts Receivable') return { ...account, balance: t.receivables }
    if (account.name === 'Accounts Payable') return { ...account, balance: t.payables }
    if (account.name === 'GST Payable') return { ...account, balance: t.gstDue }
    if (account.name === 'Service Revenue') return { ...account, balance: t.revenue }
    if (account.name === 'Operating Expenses') return { ...account, balance: t.expenses }
    return account
  })
  return data
}

function rawTotals(data) {
  const revenue = data.invoices.reduce((sum, row) => sum + num(row.total), 0)
  const collected = data.invoices.reduce((sum, row) => sum + num(row.paid), 0)
  const expenses = data.expenses.reduce((sum, row) => sum + num(row.total), 0)
  const paidExpenses = data.expenses.filter((row) => row.paid).reduce((sum, row) => sum + num(row.total), 0)
  const payables = data.expenses.filter((row) => !row.paid).reduce((sum, row) => sum + num(row.total), 0)
  const receivables = data.invoices.reduce((sum, row) => sum + Math.max(0, num(row.total) - num(row.paid)), 0)
  const gstOutput = data.invoices.reduce((sum, row) => sum + num(row.tax), 0)
  const gstInput = data.expenses.reduce((sum, row) => sum + num(row.tax), 0)
  return { revenue, collected, expenses, paidExpenses, payables, receivables, profit: revenue - expenses, gstOutput, gstInput, gstDue: gstOutput - gstInput }
}

function totals() {
  return rawTotals(state)
}

function num(value) {
  return Number(value || 0)
}

function money(value) {
  return `${state.company.currency} ${Math.round(value || 0).toLocaleString('en-IN')}`
}

function daysPastDue(dueDate) {
  return Math.max(0, Math.ceil((new Date(today) - new Date(dueDate)) / 86400000))
}

function statusClass(status) {
  return `status ${String(status).toLowerCase().replace(/\s+/g, '-')}`
}

function renderNav() {
  navList.innerHTML = pages.map((page) => `
    <button class="nav-item ${page.id === activePage ? 'active' : ''}" type="button" data-page="${page.id}" title="${page.label}">
      <span>${page.icon}</span><strong>${page.label}</strong>
    </button>
  `).join('')
  navList.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => setPage(button.dataset.page)))
}

function setPage(id) {
  activePage = id
  const page = pages.find((item) => item.id === id)
  pageTitle.textContent = page.label
  pageSubtitle.textContent = page.subtitle
  renderNav()
  renderPage()
}

function renderPage() {
  state = recalculate(state)
  const routes = {
    dashboard: renderDashboard,
    invoices: renderInvoices,
    expenses: renderExpenses,
    contacts: renderContacts,
    entries: renderEntries,
    bank: renderBank,
    ledger: renderLedger,
    tax: renderTax,
    reports: renderReports,
    settings: renderSettings,
    assistant: renderAssistant,
  }
  if (!routes[activePage]) activePage = 'dashboard'
  routes[activePage]()
}

function layout(title, body, aside = '') {
  return `
    <div class="work-grid ${aside ? '' : 'single'}">
      <section class="panel">
        <div class="panel-heading"><h2>${title}</h2></div>
        ${body}
      </section>
      ${aside ? `<aside class="panel side-panel">${aside}</aside>` : ''}
    </div>
  `
}

function renderDashboard() {
  const t = totals()
  const overdue = state.invoices.filter((row) => row.status === 'Overdue')
  const unmatched = state.bank.filter((row) => !row.matched)
  content.innerHTML = `
    <div class="metric-grid">
      ${metric('Revenue', money(t.revenue), `${state.invoices.length} invoices`)}
      ${metric('Profit', money(t.profit), `${t.revenue ? Math.round((t.profit / t.revenue) * 100) : 0}% margin`)}
      ${metric('Receivables', money(t.receivables), `${overdue.length} overdue invoice${overdue.length === 1 ? '' : 's'}`)}
      ${metric('Cash in bank', money(cashBalance()), `${unmatched.length} bank item${unmatched.length === 1 ? '' : 's'} need review`)}
    </div>
    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-heading"><h2>Cash movement</h2><span>Last 6 periods</span></div>
        <div class="bars">
          ${[['Jan', 48], ['Feb', 64], ['Mar', 52], ['Apr', 78], ['May', 69], ['Jun', 88]].map(([label, height]) => `<div class="bar-wrap"><div class="bar" style="height:${height}%"></div><span>${label}</span></div>`).join('')}
        </div>
      </section>
      <section class="panel">
        <div class="panel-heading"><h2>Attention queue</h2><span>${overdue.length + unmatched.length + state.expenses.filter((row) => row.status === 'Pending').length} items</span></div>
        <div class="stack-list">
          ${attentionItem('Collect overdue', `${money(overdue.reduce((s, row) => s + row.total - row.paid, 0))} open`, 'High', 'go-invoices')}
          ${attentionItem('Reconcile bank feed', `${unmatched.length} unmatched transaction${unmatched.length === 1 ? '' : 's'}`, 'Medium', 'go-bank')}
          ${attentionItem('Approve expenses', `${state.expenses.filter((row) => row.status === 'Pending').length} bill${state.expenses.filter((row) => row.status === 'Pending').length === 1 ? '' : 's'} waiting`, 'Medium', 'go-expenses')}
          ${attentionItem('GST liability', `${money(t.gstDue)} estimated`, 'Low', 'go-tax')}
        </div>
      </section>
    </div>
    <section class="panel">
      <div class="panel-heading"><h2>Recent activity</h2><button class="secondary-button" type="button" data-action="export-ledger">Export ledger</button></div>
      ${activityTable()}
    </section>
  `
  bindActions()
}

function cashBalance() {
  const seedCash = state.accounts.find((row) => row.name === 'Cash and Bank')?.balance || 0
  const bankDelta = state.bank.reduce((sum, row) => sum + num(row.amount), 0)
  return seedCash + bankDelta
}

function metric(label, value, note) {
  return `<div class="metric-card"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`
}

function attentionItem(title, detail, priority, action) {
  return `<button class="attention-row" type="button" data-action="${action}"><div><strong>${title}</strong><span>${detail}</span></div><em>${priority}</em></button>`
}

function activityTable() {
  const rows = [
    ...state.invoices.map((row) => ({ date: row.issueDate, type: 'Invoice', name: `${row.number} - ${row.client}`, amount: row.total, status: row.status })),
    ...state.expenses.map((row) => ({ date: row.date, type: 'Expense', name: `${row.reference} - ${row.vendor}`, amount: -row.total, status: row.status })),
    ...state.bank.map((row) => ({ date: row.date, type: 'Bank', name: row.description, amount: row.amount, status: row.matched ? 'Matched' : 'Unmatched' })),
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10)
  return table(['Date', 'Type', 'Description', 'Amount', 'Status'], rows.map((row) => [row.date, row.type, row.name, amountCell(row.amount), statusPill(row.status)]))
}

function renderInvoices() {
  const rows = state.invoices.map((row) => [
    `<strong>${row.number}</strong><span>${row.client}</span>`,
    row.issueDate,
    row.dueDate,
    money(row.total),
    money(row.total - row.paid),
    statusPill(row.status),
    actionGroup([
      ['View', 'view-invoice', row.id],
      ['Edit', 'edit-invoice', row.id],
      row.status === 'Paid' ? null : ['Pay', 'mark-paid', row.id],
      ['Send', 'send-invoice', row.id],
      ['Copy', 'copy-invoice', row.id],
      ['Delete', 'delete-invoice', row.id],
    ]),
  ])
  const open = state.invoices.filter((row) => row.status !== 'Paid')
  const aside = `
    <h2>AR aging</h2>
    ${agingRow('Current', open.filter((row) => row.status !== 'Overdue').reduce((s, row) => s + row.total - row.paid, 0))}
    ${agingRow('1-30 days', open.filter((row) => daysPastDue(row.dueDate) <= 30 && row.status === 'Overdue').reduce((s, row) => s + row.total - row.paid, 0))}
    ${agingRow('31+ days', open.filter((row) => daysPastDue(row.dueDate) > 30).reduce((s, row) => s + row.total - row.paid, 0))}
    <button class="secondary-button full" type="button" data-action="send-reminders">Send all reminders</button>
  `
  content.innerHTML = layout(
    'Invoice register',
    `<div class="module-actions"><button class="primary-button" type="button" data-open="invoice">Create invoice</button><button class="secondary-button" type="button" data-action="export-invoices">Export invoices</button></div>${table(['Invoice', 'Issue', 'Due', 'Total', 'Open', 'Status', 'Actions'], rows)}`,
    aside
  )
  bindActions()
}

function agingRow(label, value) {
  return `<div class="summary-row"><span>${label}</span><strong>${money(value)}</strong></div>`
}

function renderExpenses() {
  const rows = state.expenses.map((row) => [
    `<strong>${row.vendor}</strong><span>${row.reference}</span>`,
    row.date,
    row.category,
    money(row.total),
    statusPill(row.status),
    row.paid ? statusPill('Paid') : statusPill('Open'),
    actionGroup([
      ['Edit', 'edit-expense', row.id],
      row.status === 'Pending' ? ['Approve', 'approve-expense', row.id] : null,
      row.status !== 'Rejected' ? ['Reject', 'reject-expense', row.id] : null,
      row.paid ? null : ['Pay', 'pay-expense', row.id],
      ['Delete', 'delete-expense', row.id],
    ]),
  ])
  content.innerHTML = layout(
    'Expense workspace',
    `<div class="module-actions"><button class="primary-button" type="button" data-open="expense">Record expense</button><button class="secondary-button" type="button" data-action="pay-approved">Pay approved</button><button class="secondary-button" type="button" data-action="export-expenses">Export expenses</button></div>${table(['Vendor', 'Date', 'Category', 'Total', 'Approval', 'Payment', 'Actions'], rows)}`,
    `<h2>Spend controls</h2>${agingRow('Pending approval', state.expenses.filter((row) => row.status === 'Pending').reduce((s, row) => s + row.total, 0))}${agingRow('Unpaid approved', state.expenses.filter((row) => row.status === 'Approved' && !row.paid).reduce((s, row) => s + row.total, 0))}<p class="muted">${state.company.expensePolicy}</p>`
  )
  bindActions()
}

function renderContacts() {
  const rows = [...state.clients, ...state.vendors].map((row) => [
    `<strong>${row.name}</strong><span>${row.phone || 'No phone'}</span>`,
    row.type,
    row.email,
    row.gstin,
    row.terms,
    money(row.balance),
    actionGroup([
      ['Edit', 'edit-contact', row.id],
      ['Email', 'email-contact', row.id],
      ['Delete', 'delete-contact', row.id],
    ]),
  ])
  content.innerHTML = layout(
    'Clients and vendors',
    `<div class="module-actions"><button class="primary-button" type="button" data-open="contact">Add contact</button><button class="secondary-button" type="button" data-action="export-contacts">Export contacts</button></div>${table(['Name', 'Type', 'Email', 'GSTIN', 'Terms', 'Balance', 'Actions'], rows)}`,
    `<h2>Portfolio</h2>${agingRow('Clients', state.clients.length)}${agingRow('Vendors', state.vendors.length)}${agingRow('Net exposure', state.clients.reduce((s, row) => s + row.balance, 0) - state.vendors.reduce((s, row) => s + row.balance, 0))}`
  )
  bindActions()
}

function renderEntries() {
  const cashRows = state.cashEntries.map((row) => [
    row.date,
    row.type,
    row.account,
    row.description,
    money(row.amount),
    row.ref,
    actionGroup([
      ['Edit', 'edit-cash-entry', row.id],
      ['Delete', 'delete-cash-entry', row.id],
    ]),
  ])
  const bankRows = state.bank.map((row) => [
    row.date,
    row.description,
    amountCell(row.amount),
    row.matched ? 'Matched' : 'Unmatched',
    row.match || 'None',
    actionGroup([
      ['Edit', 'edit-bank', row.id],
      ['Delete', 'delete-bank', row.id],
    ]),
  ])
  const journalRows = state.journals.map((row) => [
    row.date,
    row.description,
    row.debit,
    row.credit,
    money(row.amount),
    row.ref,
    actionGroup([
      ['Edit', 'edit-journal', row.id],
      ['Delete', 'delete-journal', row.id],
    ]),
  ])
  content.innerHTML = layout(
    'Entries',
    `<div class="module-actions"><button class="primary-button" type="button" data-open="cashEntry">New cash entry</button><button class="primary-button" type="button" data-open="bank">New bank entry</button><button class="secondary-button" type="button" data-open="journal">New journal entry</button></div><section class="panel"><div class="panel-heading"><h2>Cash entries</h2></div>${table(['Date', 'Type', 'Account', 'Description', 'Amount', 'Reference', 'Actions'], cashRows)}</section><section class="panel"><div class="panel-heading"><h2>Bank entries</h2></div>${table(['Date', 'Description', 'Amount', 'Status', 'Matched to', 'Actions'], bankRows)}</section><section class="panel"><div class="panel-heading"><h2>Journal entries</h2></div>${table(['Date', 'Description', 'Debit', 'Credit', 'Amount', 'Reference', 'Actions'], journalRows)}</section>`,
    `<h2>Entry summary</h2>${agingRow('Cash entries', state.cashEntries.length)}${agingRow('Bank entries', state.bank.length)}${agingRow('Journal entries', state.journals.length)}`
  )
  bindActions()
}

function renderBank() {
  const rows = state.bank.map((row) => [
    row.date,
    row.description,
    amountCell(row.amount),
    statusPill(row.matched ? 'Matched' : 'Unmatched'),
    row.match || 'Needs rule',
    actionGroup([
      row.matched ? null : ['Match', 'match-bank', row.id],
      ['Edit', 'edit-bank', row.id],
      row.matched ? ['Undo', 'unmatch-bank', row.id] : ['Journal', 'journal-from-bank', row.id],
      ['Delete', 'delete-bank', row.id],
    ]),
  ])
  const matched = state.bank.filter((row) => row.matched).length
  content.innerHTML = layout(
    'Bank reconciliation',
    `<div class="module-actions"><button class="primary-button" type="button" data-open="bank">Add bank row</button><button class="secondary-button" type="button" data-action="import-bank">Import sample feed</button><button class="secondary-button" type="button" data-action="auto-match">Auto-match feed</button></div>${table(['Date', 'Bank text', 'Amount', 'Status', 'Matched to', 'Actions'], rows)}`,
    `<h2>Reconciliation</h2>${agingRow('Matched rows', matched)}${agingRow('Unmatched rows', state.bank.length - matched)}${agingRow('Bank balance', cashBalance())}`
  )
  bindActions()
}

function renderLedger() {
  const accountRows = state.accounts.map((row) => [
    row.code,
    row.name,
    row.type,
    money(row.balance),
    actionGroup([
      ['Edit', 'edit-account', row.id],
      ['Delete', 'delete-account', row.id],
    ]),
  ])
  const journalRows = state.journals.map((row) => [
    row.date,
    row.description,
    row.debit,
    row.credit,
    money(row.amount),
    row.ref,
    actionGroup([
      ['Edit', 'edit-journal', row.id],
      ['Reverse', 'reverse-journal', row.id],
      ['Delete', 'delete-journal', row.id],
    ]),
  ])
  content.innerHTML = `
    <div class="work-grid">
      <section class="panel"><div class="panel-heading"><h2>Chart of accounts</h2><button class="secondary-button" type="button" data-open="account">Add account</button></div>${table(['Code', 'Account', 'Type', 'Balance', 'Actions'], accountRows)}</section>
      <section class="panel"><div class="panel-heading"><h2>Trial balance</h2><span>Live</span></div>${trialBalance()}</section>
    </div>
    <section class="panel"><div class="panel-heading"><h2>Journal entries</h2><button class="secondary-button" type="button" data-open="journal">New journal</button></div>${table(['Date', 'Description', 'Debit', 'Credit', 'Amount', 'Reference', 'Actions'], journalRows)}</section>
  `
  bindActions()
}

function trialBalance() {
  const debit = state.accounts.filter((row) => ['Asset', 'Expense'].includes(row.type)).reduce((s, row) => s + row.balance, 0)
  const credit = state.accounts.filter((row) => ['Liability', 'Equity', 'Income'].includes(row.type)).reduce((s, row) => s + row.balance, 0)
  return `<div class="balance-box"><div><span>Debits</span><strong>${money(debit)}</strong></div><div><span>Credits</span><strong>${money(credit)}</strong></div><div><span>Difference</span><strong>${money(debit - credit)}</strong></div></div>`
}

function renderTax() {
  const t = totals()
  const rows = [
    ['Output GST on invoices', money(t.gstOutput), 'GSTR-1', statusPill('Ready')],
    ['Input GST on purchases', money(t.gstInput), 'GSTR-3B', statusPill(state.tax.itcReviewed ? 'Ready' : 'Review')],
    ['Net GST payable', money(t.gstDue), t.gstDue >= 0 ? 'Payable' : 'Credit', statusPill(state.tax.filed ? 'Filed' : 'Draft')],
  ]
  content.innerHTML = layout(
    'GST command center',
    `${table(['Item', 'Amount', 'Return', 'Status'], rows)}<div class="tax-strip"><div><span>Filing period</span><strong>${state.tax.period}</strong></div><div><span>Due date</span><strong>${state.tax.dueDate}</strong></div><div><span>Status</span><strong>${state.tax.filingStatus}</strong></div></div><div class="module-actions"><button class="primary-button" type="button" data-action="file-gst">Mark filed</button><button class="secondary-button" type="button" data-action="review-itc">Review ITC</button><button class="secondary-button" type="button" data-action="export-gst">Export GST JSON</button></div>`,
    `<h2>Compliance checks</h2>${checkRow('GSTIN captured for clients', state.clients.every((row) => row.gstin))}${checkRow('GSTIN captured for vendors', state.vendors.every((row) => row.gstin))}${checkRow('ITC mapped to approved bills', state.tax.itcReviewed)}${checkRow('HSN summary ready', true)}`
  )
  bindActions()
}

function checkRow(label, ok) {
  return `<div class="check-row"><span>${label}</span><strong class="${ok ? 'ok' : 'warn'}">${ok ? 'Ready' : 'Review'}</strong></div>`
}

function renderReports() {
  const t = totals()
  const pnl = [['Revenue', money(t.revenue)], ['Cost and operating expenses', money(t.expenses)], ['Net profit', money(t.profit)]]
  const balance = [
    ['Assets', money(state.accounts.filter((row) => row.type === 'Asset').reduce((s, row) => s + row.balance, 0))],
    ['Liabilities', money(state.accounts.filter((row) => row.type === 'Liability').reduce((s, row) => s + row.balance, 0))],
    ['Equity', money(state.accounts.filter((row) => row.type === 'Equity').reduce((s, row) => s + row.balance, 0))],
  ]
  const cash = [['Collections', money(t.collected)], ['Vendor payments', money(t.paidExpenses)], ['Net cash change', money(t.collected - t.paidExpenses)]]
  const aging = [['Current', money(state.invoices.filter((row) => row.status !== 'Overdue').reduce((s, row) => s + row.total - row.paid, 0))], ['Overdue', money(state.invoices.filter((row) => row.status === 'Overdue').reduce((s, row) => s + row.total - row.paid, 0))]]
  content.innerHTML = `
    <div class="module-actions"><button class="primary-button" type="button" data-action="print-reports">Print report pack</button><button class="secondary-button" type="button" data-action="export-reports">Export report pack</button></div>
    <div class="report-grid">
      <section class="panel"><div class="panel-heading"><h2>Profit and loss</h2><span>Accrual basis</span></div>${table(['Line item', 'Amount'], pnl)}</section>
      <section class="panel"><div class="panel-heading"><h2>Balance sheet</h2><span>${state.company.fiscalYear}</span></div>${table(['Line item', 'Amount'], balance)}</section>
      <section class="panel"><div class="panel-heading"><h2>Cash flow</h2><span>Operating view</span></div>${table(['Line item', 'Amount'], cash)}</section>
      <section class="panel"><div class="panel-heading"><h2>AR aging</h2><span>Collections</span></div>${table(['Bucket', 'Open amount'], aging)}</section>
    </div>
  `
  bindActions()
}

function renderSettings() {
  const rows = [
    ['Company', state.company.name],
    ['GSTIN', state.company.gstin],
    ['Fiscal year', state.company.fiscalYear],
    ['Currency', state.company.currency],
    ['Invoice numbering', `${state.company.invoicePrefix}-####`],
    ['Expense policy', state.company.expensePolicy],
  ]
  content.innerHTML = layout(
    'Company settings',
    `${table(['Setting', 'Value'], rows)}<div class="module-actions"><button class="primary-button" type="button" data-open="settings">Edit company</button><button class="secondary-button" type="button" data-open="user">Invite user</button><button class="secondary-button" type="button" data-action="reset-demo">Reset demo data</button></div>`,
    `<h2>User access</h2>${table(['User', 'Email', 'Role', 'Status', 'Actions'], state.users.map((row) => [row.name, row.email, row.role, row.status, actionGroup([['Edit', 'edit-user', row.id], ['Delete', 'delete-user', row.id]])]))}`
  )
  bindActions()
}

function renderAssistant() {
  const t = totals()
  const unmatched = state.bank.filter((row) => !row.matched).length
  const prompts = [
    ['Cash risk', `Open receivables are ${money(t.receivables)} and unpaid bills are ${money(t.payables)}. Prioritize collection before paying lower-priority bills.`],
    ['Tax note', `Current net GST estimate is ${money(t.gstDue)}. Review ITC before marking the return filed.`],
    ['Close checklist', `Reconcile ${unmatched} bank row${unmatched === 1 ? '' : 's'}, approve pending expenses, and post missing bank fee journals.`],
  ]
  content.innerHTML = layout(
    'Accounting assistant',
    `<div class="assistant-list">${prompts.map(([title, text]) => `<article><strong>${title}</strong><p>${text}</p></article>`).join('')}</div>`,
    `<h2>Ask next</h2><button class="secondary-button full" type="button" data-action="assistant-profit">Explain profit</button><button class="secondary-button full" type="button" data-action="assistant-overdue">Prioritize collections</button><button class="secondary-button full" type="button" data-action="assistant-close">Build close checklist</button>`
  )
  bindActions()
}

function table(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map((head) => `<th>${head}</th>`).join('')}</tr></thead>
        <tbody>${rows.length ? rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${headers.length}">No records yet</td></tr>`}</tbody>
      </table>
    </div>
  `
}

function actionGroup(actions) {
  return `<div class="row-actions">${actions.filter(Boolean).map(([label, action, id]) => `<button class="text-button" type="button" data-action="${action}" ${id ? `data-id="${id}"` : ''}>${label}</button>`).join('')}</div>`
}

function amountCell(value) {
  return `<span class="${value >= 0 ? 'positive' : 'negative'}">${value >= 0 ? '+' : '-'}${money(Math.abs(value))}</span>`
}

function statusPill(status) {
  return `<span class="${statusClass(status)}">${status}</span>`
}

function bindActions() {
  content.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => openModal(button.dataset.open)))
  content.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => handleAction(button.dataset.action, button.dataset.id)))
}

function handleAction(action, id) {
  const transitions = {
    'go-invoices': () => setPage('invoices'),
    'go-expenses': () => setPage('expenses'),
    'go-bank': () => setPage('bank'),
    'go-tax': () => setPage('tax'),
    'mark-paid': () => markInvoicePaid(id),
    'send-invoice': () => toast(`Invoice ${findInvoice(id).number} email queued.`),
    'copy-invoice': () => copyInvoice(id),
    'view-invoice': () => openModal('invoicePreview', id),
    'edit-invoice': () => openModal('invoice', id),
    'delete-invoice': () => removeRow('invoices', id, 'Invoice deleted.'),
    'approve-expense': () => updateExpense(id, { status: 'Approved' }, 'Expense approved.'),
    'reject-expense': () => updateExpense(id, { status: 'Rejected' }, 'Expense rejected.'),
    'pay-expense': () => updateExpense(id, { paid: true, status: 'Approved' }, 'Expense marked paid.'),
    'edit-expense': () => openModal('expense', id),
    'delete-expense': () => removeRow('expenses', id, 'Expense deleted.'),
    'pay-approved': payApprovedExpenses,
    'edit-contact': () => openModal('contact', id),
    'email-contact': () => toast(`Email opened for ${findContact(id).name}.`),
    'delete-contact': () => deleteContact(id),
    'match-bank': () => matchBank(id),
    'unmatch-bank': () => updateBank(id, { matched: false, match: '' }, 'Bank match removed.'),
    'journal-from-bank': () => createJournalFromBank(id),
    'edit-bank': () => openModal('bank', id),
    'delete-bank': () => removeRow('bank', id, 'Bank row deleted.'),
    'edit-cash-entry': () => openModal('cashEntry', id),
    'delete-cash-entry': () => removeRow('cashEntries', id, 'Cash entry removed.'),
    'import-bank': importBankFeed,
    'auto-match': autoMatchFeed,
    'edit-account': () => openModal('account', id),
    'delete-account': () => removeRow('accounts', id, 'Account deleted.'),
    'edit-journal': () => openModal('journal', id),
    'delete-journal': () => removeRow('journals', id, 'Journal deleted.'),
    'reverse-journal': () => reverseJournal(id),
    'file-gst': fileGst,
    'review-itc': reviewItc,
    'print-reports': printReports,
    'edit-user': () => openModal('user', id),
    'delete-user': () => removeRow('users', id, 'User removed.'),
    'reset-demo': resetDemo,
    'assistant-profit': () => toast(`Profit is ${money(totals().profit)}, from ${money(totals().revenue)} revenue less ${money(totals().expenses)} expenses.`),
    'assistant-overdue': () => toast('Collections priority: Blue Peak Labs first, then Tech Solutions and Global Services by open value.'),
    'assistant-close': () => toast('Close checklist created: reconcile bank, approve bills, review ITC, export reports.'),
    'send-reminders': () => toast('Payment reminders queued for every open invoice.'),
    'export-invoices': () => exportRows('accountly-invoices.csv', state.invoices),
    'export-expenses': () => exportRows('accountly-expenses.csv', state.expenses),
    'export-contacts': () => exportRows('accountly-contacts.csv', [...state.clients, ...state.vendors]),
    'export-gst': () => exportRows('accountly-gst-summary.csv', gstRows()),
    'export-reports': () => exportRows('accountly-report-pack.csv', reportRows()),
    'export-ledger': () => exportRows('accountly-ledger.csv', state.journals),
  }
  transitions[action]?.()
  saveState()
  renderPage()
}

function findInvoice(id) {
  return state.invoices.find((row) => row.id === id)
}

function findExpense(id) {
  return state.expenses.find((row) => row.id === id)
}

function findContact(id) {
  return [...state.clients, ...state.vendors].find((row) => row.id === id)
}

function markInvoicePaid(id) {
  const invoice = findInvoice(id)
  state.invoices = state.invoices.map((row) => row.id === id ? { ...row, paid: row.total, status: 'Paid' } : row)
  state.bank.unshift({ id: uid('b'), date: today, description: `Payment ${invoice.number} ${invoice.client}`, amount: invoice.total, matched: true, match: invoice.number })
  state.journals.unshift({ id: uid('j'), date: today, description: `${invoice.client} payment received`, debit: 'Cash and Bank', credit: 'Accounts Receivable', amount: invoice.total, ref: invoice.number })
  toast(`${invoice.number} marked paid.`)
}

function copyInvoice(id) {
  const invoice = findInvoice(id)
  const copy = { ...invoice, id: uid('i'), number: nextInvoiceNumber(), issueDate: today, dueDate: '2026-07-17', paid: 0, status: 'Draft' }
  state.invoices.unshift(copy)
  toast(`${copy.number} copied from ${invoice.number}.`)
}

function updateExpense(id, patch, message) {
  state.expenses = state.expenses.map((row) => row.id === id ? { ...row, ...patch } : row)
  toast(message)
}

function payApprovedExpenses() {
  const bills = state.expenses.filter((row) => row.status === 'Approved' && !row.paid)
  bills.forEach((bill) => {
    state.bank.unshift({ id: uid('b'), date: today, description: `Payment ${bill.vendor}`, amount: -bill.total, matched: true, match: bill.reference })
  })
  state.expenses = state.expenses.map((row) => row.status === 'Approved' ? { ...row, paid: true } : row)
  toast(`${bills.length} approved expense${bills.length === 1 ? '' : 's'} paid.`)
}

function deleteContact(id) {
  const contact = findContact(id)
  const inUse = state.invoices.some((row) => row.client === contact.name) || state.expenses.some((row) => row.vendor === contact.name)
  if (inUse) {
    toast('Contact has transactions and was kept for audit history.')
    return
  }
  state.clients = state.clients.filter((row) => row.id !== id)
  state.vendors = state.vendors.filter((row) => row.id !== id)
  toast('Contact deleted.')
}

function matchBank(id) {
  const row = state.bank.find((item) => item.id === id)
  updateBank(id, { matched: true, match: suggestMatch(row) }, 'Bank row matched.')
}

function updateBank(id, patch, message) {
  state.bank = state.bank.map((row) => row.id === id ? { ...row, ...patch } : row)
  toast(message)
}

function autoMatchFeed() {
  state.bank = state.bank.map((row) => row.matched ? row : { ...row, matched: true, match: suggestMatch(row) })
  toast('Bank feed auto-matched.')
}

function suggestMatch(row) {
  const abs = Math.abs(row.amount)
  const invoice = state.invoices.find((item) => item.total === abs)
  const expense = state.expenses.find((item) => item.total === abs)
  return invoice?.number || expense?.reference || 'Manual journal'
}

function importBankFeed() {
  state.bank.unshift(
    { id: uid('b'), date: today, description: 'IMPS TECH SOLUTIONS PARTIAL', amount: 24000, matched: false, match: '' },
    { id: uid('b'), date: today, description: 'CARD SOFTWARE SUBSCRIPTION', amount: -3200, matched: false, match: '' }
  )
  toast('Sample bank feed imported.')
}

function createJournalFromBank(id) {
  const row = state.bank.find((item) => item.id === id)
  state.journals.unshift({
    id: uid('j'),
    date: row.date,
    description: row.description,
    debit: row.amount < 0 ? 'Operating Expenses' : 'Cash and Bank',
    credit: row.amount < 0 ? 'Cash and Bank' : 'Service Revenue',
    amount: Math.abs(row.amount),
    ref: 'BANK',
  })
  updateBank(id, { matched: true, match: 'Manual journal' }, 'Journal created from bank row.')
}

function reverseJournal(id) {
  const journal = state.journals.find((row) => row.id === id)
  state.journals.unshift({ ...journal, id: uid('j'), debit: journal.credit, credit: journal.debit, description: `Reversal - ${journal.description}`, ref: `REV-${journal.ref}` })
  toast('Reversal journal posted.')
}

function removeRow(collection, id, message) {
  state[collection] = state[collection].filter((row) => row.id !== id)
  toast(message)
}

function fileGst() {
  state.tax.filed = true
  state.tax.filingStatus = 'Filed'
  toast('GST return marked filed.')
}

function reviewItc() {
  state.tax.itcReviewed = true
  toast('Input tax credit review completed.')
}

function printReports() {
  window.print()
  toast('Print dialog opened for report pack.')
}

function resetDemo() {
  state = seedState()
  localStorage.removeItem(STORAGE_KEY)
  toast('Demo data reset.')
}

function openModal(type, id = null) {
  const config = modalConfig(type, id)
  modal.innerHTML = `
    <div class="modal-overlay" role="presentation">
      <div class="modal-dialog ${type === 'invoicePreview' ? 'wide' : ''}" role="dialog" aria-modal="true" aria-label="${config.title}">
        <div class="modal-head"><h2>${config.title}</h2><button class="icon-button" type="button" data-close>Close</button></div>
        ${config.body}
      </div>
    </div>
  `
  modal.querySelector('[data-close]').addEventListener('click', closeModal)
  modal.querySelector('.modal-overlay').addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-overlay')) closeModal()
  })
  const form = modal.querySelector('form')
  if (form) form.addEventListener('submit', submitModal)
  modal.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => handleAction(button.dataset.action, button.dataset.id))
  })
}

function modalConfig(type, id) {
  const forms = {
    invoice: () => formModal(id ? 'Edit invoice' : 'Create invoice', 'invoice', id, invoiceForm(findInvoice(id))),
    invoicePreview: () => ({ title: 'Invoice preview', body: invoicePreview(findInvoice(id)) }),
    expense: () => formModal(id ? 'Edit expense' : 'Record expense', 'expense', id, expenseForm(findExpense(id))),
    contact: () => formModal(id ? 'Edit contact' : 'Add contact', 'contact', id, contactForm(findContact(id))),
    cashEntry: () => formModal(id ? 'Edit cash entry' : 'New cash entry', 'cashEntry', id, cashEntryForm(state.cashEntries.find((row) => row.id === id))),
    bank: () => formModal(id ? 'Edit bank row' : 'Add bank row', 'bank', id, bankForm(state.bank.find((row) => row.id === id))),
    account: () => formModal(id ? 'Edit account' : 'Add account', 'account', id, accountForm(state.accounts.find((row) => row.id === id))),
    journal: () => formModal(id ? 'Edit journal' : 'New journal entry', 'journal', id, journalForm(state.journals.find((row) => row.id === id))),
    settings: () => formModal('Edit company settings', 'settings', id, settingsForm()),
    user: () => formModal(id ? 'Edit user' : 'Invite user', 'user', id, userForm(state.users.find((row) => row.id === id))),
  }
  return forms[type]()
}

function formModal(title, type, id, fields) {
  return { title, body: `<form id="modalForm" data-type="${type}" ${id ? `data-id="${id}"` : ''}>${fields}</form>` }
}

function invoiceForm(row = {}) {
  const items = [...Array(3)].map((_, idx) => ({
    description: row.items?.[idx]?.description || (idx === 0 ? 'Product / service' : ''),
    quantity: row.items?.[idx]?.quantity ?? (idx === 0 ? 1 : 0),
    unitPrice: row.items?.[idx]?.unitPrice ?? 0,
    cgstRate: row.items?.[idx]?.cgstRate ?? 9,
    sgstRate: row.items?.[idx]?.sgstRate ?? 9,
  }))
  return `
    ${field('client', 'Client', 'select', state.clients.map((item) => item.name), row.client)}
    ${field('issueDate', 'Issue date', 'date', [], row.issueDate || today)}
    ${field('dueDate', 'Due date', 'date', [], row.dueDate || '2026-07-17')}
    <div class="invoice-items">
      <h3>Invoice items</h3>
      ${items.map((item, idx) => invoiceItemField(idx, item)).join('')}
      <p class="muted">Enter item details and GST rates. Totals calculate automatically.</p>
    </div>
    ${field('status', 'Status', 'select', ['Draft', 'Sent', 'Paid', 'Overdue'], row.status || 'Draft')}
    ${field('notes', 'Notes', 'textarea', [], row.notes || '')}
    <button class="primary-button full" type="submit">Save invoice</button>
  `
}

function invoiceItemField(index, item) {
  return `
    <div class="item-row">
      ${field(`item${index}_description`, 'Description', 'text', [], item.description)}
      ${field(`item${index}_quantity`, 'Qty', 'number', [], item.quantity)}
      ${field(`item${index}_unitPrice`, 'Unit price', 'number', [], item.unitPrice)}
      ${field(`item${index}_cgstRate`, 'CGST %', 'number', [], item.cgstRate)}
      ${field(`item${index}_sgstRate`, 'SGST %', 'number', [], item.sgstRate)}
    </div>
  `
}

function expenseForm(row = {}) {
  return `
    ${field('vendor', 'Vendor', 'select', state.vendors.map((item) => item.name), row.vendor)}
    ${field('date', 'Date', 'date', [], row.date || today)}
    ${field('category', 'Category', 'select', ['Office Supplies', 'Travel', 'Software', 'Rent', 'Utilities', 'Professional Fees'], row.category)}
    ${field('reference', 'Reference', 'text', [], row.reference || `BILL-${Date.now().toString().slice(-4)}`)}
    ${field('amount', 'Amount before GST', 'number', [], row.amount || '10000')}
    ${field('tax', 'GST', 'number', [], row.tax || '1800')}
    ${field('status', 'Approval status', 'select', ['Pending', 'Approved', 'Rejected'], row.status || 'Pending')}
    ${field('paid', 'Payment status', 'select', ['Open', 'Paid'], row.paid ? 'Paid' : 'Open')}
    ${field('notes', 'Notes', 'textarea', [], row.notes || '')}
    <button class="primary-button full" type="submit">Save expense</button>
  `
}

function contactForm(row = {}) {
  return `
    ${field('type', 'Type', 'select', ['Client', 'Vendor'], row.type || 'Client')}
    ${field('name', 'Name', 'text', [], row.name || '')}
    ${field('email', 'Email', 'email', [], row.email || '')}
    ${field('phone', 'Phone', 'text', [], row.phone || '')}
    ${field('gstin', 'GSTIN', 'text', [], row.gstin || '')}
    ${field('terms', 'Terms', 'text', [], row.terms || 'Net 30')}
    <button class="primary-button full" type="submit">Save contact</button>
  `
}

function bankForm(row = {}) {
  return `
    ${field('date', 'Date', 'date', [], row.date || today)}
    ${field('description', 'Description', 'text', [], row.description || '')}
    ${field('amount', 'Amount', 'number', [], row.amount || '')}
    ${field('matched', 'Status', 'select', ['Unmatched', 'Matched'], row.matched ? 'Matched' : 'Unmatched')}
    ${field('match', 'Matched to', 'text', [], row.match || '')}
    <button class="primary-button full" type="submit">Save bank row</button>
  `
}

function cashEntryForm(row = {}) {
  return `
    ${field('date', 'Date', 'date', [], row.date || today)}
    ${field('type', 'Type', 'select', ['Receipt', 'Payment'], row.type || 'Receipt')}
    ${field('account', 'Account', 'select', state.accounts.map((item) => item.name), row.account || 'Cash and Bank')}
    ${field('description', 'Description', 'text', [], row.description || '')}
    ${field('amount', 'Amount', 'number', [], row.amount || '')}
    ${field('ref', 'Reference', 'text', [], row.ref || `CASH-${Date.now().toString().slice(-4)}`)}
    <button class="primary-button full" type="submit">Save cash entry</button>
  `
}

function accountForm(row = {}) {
  return `
    ${field('code', 'Code', 'text', [], row.code || '')}
    ${field('name', 'Account name', 'text', [], row.name || '')}
    ${field('type', 'Type', 'select', ['Asset', 'Liability', 'Equity', 'Income', 'Expense'], row.type || 'Asset')}
    ${field('balance', 'Opening balance', 'number', [], row.balance || '0')}
    <button class="primary-button full" type="submit">Save account</button>
  `
}

function journalForm(row = {}) {
  return `
    ${field('date', 'Date', 'date', [], row.date || today)}
    ${field('description', 'Description', 'text', [], row.description || 'Bank fee')}
    ${field('debit', 'Debit account', 'select', state.accounts.map((item) => item.name), row.debit)}
    ${field('credit', 'Credit account', 'select', state.accounts.map((item) => item.name), row.credit)}
    ${field('amount', 'Amount', 'number', [], row.amount || '590')}
    ${field('ref', 'Reference', 'text', [], row.ref || 'MANUAL')}
    <button class="primary-button full" type="submit">Post journal</button>
  `
}

function settingsForm() {
  return `
    ${field('name', 'Company name', 'text', [], state.company.name)}
    ${field('gstin', 'GSTIN', 'text', [], state.company.gstin)}
    ${field('fiscalYear', 'Fiscal year', 'text', [], state.company.fiscalYear)}
    ${field('currency', 'Currency', 'select', ['INR', 'USD', 'EUR', 'GBP'], state.company.currency)}
    ${field('invoicePrefix', 'Invoice prefix', 'text', [], state.company.invoicePrefix)}
    ${field('email', 'Finance email', 'email', [], state.company.email)}
    ${field('address', 'Address', 'textarea', [], state.company.address)}
    ${field('expensePolicy', 'Expense policy', 'textarea', [], state.company.expensePolicy)}
    <button class="primary-button full" type="submit">Save settings</button>
  `
}

function userForm(row = {}) {
  return `
    ${field('name', 'Name', 'text', [], row.name || '')}
    ${field('email', 'Email', 'email', [], row.email || '')}
    ${field('role', 'Role', 'select', ['Admin', 'Accountant', 'Viewer'], row.role || 'Viewer')}
    ${field('status', 'Status', 'select', ['Active', 'Invited', 'Disabled'], row.status || 'Invited')}
    <button class="primary-button full" type="submit">Save user</button>
  `
}

function field(name, label, type, options = [], value = '') {
  if (type === 'select') {
    return `<label>${label}<select name="${name}">${options.map((item) => `<option ${item === value ? 'selected' : ''}>${item}</option>`).join('')}</select></label>`
  }
  if (type === 'textarea') {
    return `<label>${label}<textarea name="${name}" rows="3">${value || ''}</textarea></label>`
  }
  return `<label>${label}<input name="${name}" type="${type}" value="${value || ''}" required /></label>`
}

function invoicePreview(invoice) {
  const lineRows = invoice.items?.length ? invoice.items.map((item) => {
    const lineBase = item.quantity * item.unitPrice
    const cgst = Math.round(lineBase * item.cgstRate / 100)
    const sgst = Math.round(lineBase * item.sgstRate / 100)
    return [item.description, item.quantity, money(item.unitPrice), `${item.cgstRate}%`, `${item.sgstRate}%`, money(lineBase), money(cgst), money(sgst), money(lineBase + cgst + sgst)]
  }) : [[invoice.notes || 'Professional services', '', '', '', '', money(invoice.subtotal), money(invoice.cgst || invoice.tax / 2), money(invoice.sgst || invoice.tax / 2), money(invoice.total)]]
  return `
    <div class="invoice-preview">
      <div><strong>${state.company.name}</strong><span>${state.company.gstin}</span><span>${state.company.address}</span></div>
      <div><strong>${invoice.number}</strong><span>${invoice.client}</span><span>Due ${invoice.dueDate}</span></div>
      ${table(['Description', 'Qty', 'Unit price', 'CGST', 'SGST', 'Base', 'CGST amount', 'SGST amount', 'Line total'], lineRows)}
      <div class="summary-row"><span>Subtotal</span><strong>${money(invoice.subtotal)}</strong></div>
      <div class="summary-row"><span>CGST</span><strong>${money(invoice.cgst || 0)}</strong></div>
      <div class="summary-row"><span>SGST</span><strong>${money(invoice.sgst || 0)}</strong></div>
      <div class="summary-row"><span>Total</span><strong>${money(invoice.total)}</strong></div>
      <div class="module-actions"><button class="primary-button" type="button" data-action="send-invoice" data-id="${invoice.id}">Send invoice</button><button class="secondary-button" type="button" onclick="window.print()">Print</button></div>
    </div>
  `
}

function submitModal(event) {
  event.preventDefault()
  const form = new FormData(event.target)
  const type = event.target.dataset.type
  const id = event.target.dataset.id
  const upsert = (collection, record) => {
    state[collection] = id ? state[collection].map((row) => row.id === id ? { ...row, ...record } : row) : [{ ...record, id: uid(collection[0]) }, ...state[collection]]
  }

  if (type === 'invoice') {
    const items = []
    for (let idx = 0; idx < 3; idx += 1) {
      const description = form.get(`item${idx}_description`)
      const quantity = num(form.get(`item${idx}_quantity`))
      const unitPrice = num(form.get(`item${idx}_unitPrice`))
      const cgstRate = num(form.get(`item${idx}_cgstRate`))
      const sgstRate = num(form.get(`item${idx}_sgstRate`))
      if (description || quantity || unitPrice) {
        items.push({ description: description || 'Item', quantity, unitPrice, cgstRate, sgstRate })
      }
    }
    const subtotal = items.length ? items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) : num(form.get('subtotal'))
    const cgst = items.length ? items.reduce((sum, item) => sum + Math.round(item.quantity * item.unitPrice * item.cgstRate / 100), 0) : num(form.get('cgst') || 0)
    const sgst = items.length ? items.reduce((sum, item) => sum + Math.round(item.quantity * item.unitPrice * item.sgstRate / 100), 0) : num(form.get('sgst') || 0)
    const tax = cgst + sgst
    upsert('invoices', { number: id ? findInvoice(id).number : nextInvoiceNumber(), client: form.get('client'), issueDate: form.get('issueDate'), dueDate: form.get('dueDate'), subtotal, cgst, sgst, tax, total: subtotal + tax, paid: form.get('status') === 'Paid' ? subtotal + tax : (id ? findInvoice(id).paid : 0), status: form.get('status'), notes: form.get('notes'), items })
  }
  if (type === 'expense') {
    const amount = num(form.get('amount'))
    const tax = num(form.get('tax'))
    upsert('expenses', { vendor: form.get('vendor'), date: form.get('date'), category: form.get('category'), reference: form.get('reference'), amount, tax, total: amount + tax, status: form.get('status'), paid: form.get('paid') === 'Paid', notes: form.get('notes') })
  }
  if (type === 'contact') {
    const record = { id: id || uid('x'), name: form.get('name'), type: form.get('type'), email: form.get('email'), phone: form.get('phone'), gstin: form.get('gstin'), terms: form.get('terms'), balance: 0 }
    if (id) {
      state.clients = state.clients.filter((row) => row.id !== id)
      state.vendors = state.vendors.filter((row) => row.id !== id)
    }
    if (record.type === 'Client') state.clients.unshift(record)
    else state.vendors.unshift(record)
  }
  if (type === 'bank') upsert('bank', { date: form.get('date'), description: form.get('description'), amount: num(form.get('amount')), matched: form.get('matched') === 'Matched', match: form.get('match') })
  if (type === 'cashEntry') upsert('cashEntries', { date: form.get('date'), type: form.get('type'), account: form.get('account'), description: form.get('description'), amount: num(form.get('amount')), ref: form.get('ref') })
  if (type === 'account') upsert('accounts', { code: form.get('code'), name: form.get('name'), type: form.get('type'), balance: num(form.get('balance')) })
  if (type === 'journal') upsert('journals', { date: form.get('date'), description: form.get('description'), debit: form.get('debit'), credit: form.get('credit'), amount: num(form.get('amount')), ref: form.get('ref') })
  if (type === 'settings') state.company = { ...state.company, name: form.get('name'), gstin: form.get('gstin'), fiscalYear: form.get('fiscalYear'), currency: form.get('currency'), invoicePrefix: form.get('invoicePrefix'), email: form.get('email'), address: form.get('address'), expensePolicy: form.get('expensePolicy') }
  if (type === 'user') upsert('users', { name: form.get('name'), email: form.get('email'), role: form.get('role'), status: form.get('status') })

  saveState()
  closeModal()
  toast('Saved.')
  renderPage()
}

function closeModal() {
  modal.innerHTML = ''
}

function uid(prefix) {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`
}

function nextInvoiceNumber() {
  return `${state.company.invoicePrefix}-${String(state.invoices.length + 1).padStart(4, '0')}`
}

function toast(message) {
  const existing = document.querySelector('.toast')
  if (existing) existing.remove()
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = message
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 2600)
}

function exportRows(filename, rows) {
  const normalized = rows.length ? rows : [{ empty: 'No data' }]
  const headers = Object.keys(normalized[0])
  const csv = [headers.join(','), ...normalized.map((row) => headers.map((key) => `"${String(row[key] ?? '').replaceAll('"', '""')}"`).join(','))].join('\n')
  download(filename, csv, 'text/csv')
  toast(`${filename} downloaded.`)
}

function gstRows() {
  const t = totals()
  return [
    { item: 'Output GST', amount: t.gstOutput, return: 'GSTR-1' },
    { item: 'Input GST', amount: t.gstInput, return: 'GSTR-3B' },
    { item: 'Net GST', amount: t.gstDue, return: state.tax.filingStatus },
  ]
}

function reportRows() {
  const t = totals()
  return [
    { report: 'Profit and loss', line: 'Revenue', amount: t.revenue },
    { report: 'Profit and loss', line: 'Expenses', amount: t.expenses },
    { report: 'Profit and loss', line: 'Net profit', amount: t.profit },
    { report: 'Cash flow', line: 'Collections', amount: t.collected },
    { report: 'Cash flow', line: 'Vendor payments', amount: t.paidExpenses },
  ]
}

function download(filename, body, type) {
  const blob = new Blob([body], { type })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

function exportData() {
  download('accountly-export.json', JSON.stringify(state, null, 2), 'application/json')
  toast('Full data export downloaded.')
}

document.getElementById('newInvoiceBtn').addEventListener('click', () => openModal('invoice'))
document.getElementById('newExpenseBtn').addEventListener('click', () => openModal('expense'))
document.getElementById('newEntryBtn').addEventListener('click', () => setPage('entries'))
document.getElementById('exportBtn').addEventListener('click', exportData)

renderNav()
setPage(activePage)
