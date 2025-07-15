import React, { useState } from 'react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      setMessage(`Welcome, ${data.name}!`)
    } else {
      setMessage(data.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl w-96">
        <h2 className="text-2xl mb-4 font-bold text-purple-400">Login</h2>
        <input className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
          name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button className="bg-purple-600 w-full p-2 rounded">Login</button>
        {message && <p className="mt-4 text-sm text-yellow-400">{message}</p>}
      </form>
    </div>
  )
}
