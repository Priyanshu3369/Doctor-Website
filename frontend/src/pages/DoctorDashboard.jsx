import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'

export default function DoctorDashboard() {
  return (
    <ProtectedRoute role="doctor">
      <div className="p-8">
        <h1 className="text-2xl text-green-400">Doctor Dashboard</h1>
        <p>Protected content for doctors only.</p>
      </div>
    </ProtectedRoute>
  )
}
