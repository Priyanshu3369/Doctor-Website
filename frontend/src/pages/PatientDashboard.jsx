import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'

export default function PatientDashboard() {
  return (
    <ProtectedRoute role="patient">
      <div className="p-8">
        <h1 className="text-2xl text-green-400">Patient Dashboard</h1>
        <p>Protected content for patients only.</p>
      </div>
    </ProtectedRoute>
  )
}
