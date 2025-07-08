import { useState } from 'react'
import api from '../utils/api'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', role: 'patient' })

  const handleRegister = async () => {
    if (!form.email || !form.password || !form.role) {
      alert('Please fill all fields')
      return
    }

    try {
      await api.post('/auth/register', form)
      alert('Registered successfully! You can now login.')
    } catch (err) {
      console.error('Register error:', err)
      alert(err.response?.data?.msg || 'Register failed')
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <select
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}
