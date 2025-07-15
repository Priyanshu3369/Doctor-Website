import React, { useState } from 'react'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient'
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) {
      setMessage('Registered successfully! Now login.')
    } else {
      setMessage(data.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl w-96">
        <h2 className="text-2xl mb-4 font-bold text-purple-400">Register</h2>
        <input className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
          name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
          name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
          name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <select className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          name="role" value={form.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button className="bg-purple-600 w-full p-2 rounded">Register</button>
        {message && <p className="mt-4 text-sm text-yellow-400">{message}</p>}
      </form>
    </div>
  )
}
