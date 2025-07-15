import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-800 flex gap-4">
        <Link to="/" className="text-purple-400">Home</Link>
        <Link to="/register" className="text-purple-400">Register</Link>
        <Link to="/login" className="text-purple-400">Login</Link>
        <Link to="/patient-dashboard" className="text-purple-400">Patient Dashboard</Link>
        <Link to="/doctor-dashboard" className="text-purple-400">Doctor Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div className="p-8">Home Page</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
