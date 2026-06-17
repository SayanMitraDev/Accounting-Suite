import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Accounting App</h1>
          <p className="mt-2 text-slate-600">Welcome to your accounting dashboard. Live preview is now working.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Getting Started</h2>
            <p className="mt-3 text-slate-600">This is your React app shell. Build dashboard, invoices, expenses, and AI assistant here.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Status</h2>
            <p className="mt-3 text-slate-600">Live preview should now render the frontend correctly.</p>
            <button
              className="mt-5 rounded-full bg-brand-600 px-4 py-2 text-white shadow hover:bg-brand-700"
              onClick={() => setCount((c) => c + 1)}
            >
              Clicked {count} times
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
