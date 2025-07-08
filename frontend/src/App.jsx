import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Dashboard from './pages/Dashboard'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { token } = useAuth()

  return (
    <Routes>
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
