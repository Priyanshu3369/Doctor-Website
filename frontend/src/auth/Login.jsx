import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async () => {
    setMessage('')
    setError('')

    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data.access_token)
      setMessage('✅ Logged in successfully! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1500) // Adjust route as needed
    } catch (err) {
      console.error('Login error:', err)
      setError(err.response?.data?.msg || '❌ Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>

      {message && <p className="text-green-600 font-medium mt-4">{message}</p>}
      {error && <p className="text-red-600 font-medium mt-4">{error}</p>}
    </div>
  )
}
