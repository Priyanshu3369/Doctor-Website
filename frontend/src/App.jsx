import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// ✅ Pages (example — adjust to your files!)
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'

// Dashboards & features
import PatientDashboard from './pages/PatientDashboard'
import BookAppointment from './pages/PatientBooking'
import DoctorDashboard from './pages/DoctorDashboard'
import DoctorSlots from './pages/DoctorSlots'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Patient */}
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/book-appointment" element={<BookAppointment />} />

          {/* Doctor */}
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/create-slot" element={<DoctorSlots />} />

          {/* Admin */}
          <Route path="/dashboard/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </Router>
  )
}
