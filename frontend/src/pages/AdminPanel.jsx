import React, { useEffect, useState } from 'react'

export default function AdminPanel() {
  const [doctors, setDoctors] = useState([])

  const fetchDoctors = () => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:5000/api/admin/doctors', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setDoctors(data))
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const toggleVerify = (email, is_verified) => {
    const token = localStorage.getItem('token')
    fetch(`http://localhost:5000/api/admin/verify/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ is_verified: !is_verified })
    })
      .then(res => res.json())
      .then(data => fetchDoctors())
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-lg text-white">
      <h1 className="text-2xl mb-4 text-purple-400">Admin Panel - Doctors</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b border-gray-700 p-2">Name</th>
            <th className="border-b border-gray-700 p-2">Email</th>
            <th className="border-b border-gray-700 p-2">Verified</th>
            <th className="border-b border-gray-700 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doc => (
            <tr key={doc._id}>
              <td className="p-2">{doc.name}</td>
              <td className="p-2">{doc.email}</td>
              <td className="p-2">{doc.is_verified ? '✅' : '❌'}</td>
              <td className="p-2">
                <button
                  onClick={() => toggleVerify(doc.email, doc.is_verified)}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded"
                >
                  {doc.is_verified ? 'Unverify' : 'Verify'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
