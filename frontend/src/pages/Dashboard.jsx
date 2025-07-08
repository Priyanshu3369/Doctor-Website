import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data.access_token)
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
