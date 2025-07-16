import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    navigate('/')
  }

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold text-purple-400">🩺 HealthHub</Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-purple-400">Home</Link>
        <Link to="/about" className="hover:text-purple-400">About</Link>
        <Link to="/contact" className="hover:text-purple-400">Contact</Link>

        {!token && (
          <>
            <Link to="/login" className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-700">Login</Link>
            <Link to="/register" className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-700">Register</Link>
          </>
        )}

        {token && (
          <>
            {role === 'patient' && <Link to="/dashboard/patient" className="hover:text-purple-400">Dashboard</Link>}
            {role === 'doctor' && <Link to="/dashboard/doctor" className="hover:text-purple-400">Dashboard</Link>}
            {role === 'admin' && <Link to="/dashboard/admin" className="hover:text-purple-400">Admin</Link>}
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}
