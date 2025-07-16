import React, { useEffect, useState } from 'react'

export default function DoctorProfile() {
  const [profile, setProfile] = useState(null)
  const [specialization, setSpecialization] = useState('')
  const [bio, setBio] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    fetch('http://localhost:5000/api/doctor/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data)
        setSpecialization(data.specialization)
        setBio(data.bio)
      })
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    fetch('http://localhost:5000/api/doctor/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ specialization, bio })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message)
      })
  }

  if (!profile) return <div className="p-8">Loading profile...</div>

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-900 rounded-xl shadow-lg">
      <h1 className="text-2xl mb-4 text-purple-400">Doctor Profile</h1>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Verified:</strong> {profile.is_verified ? 'Yes' : 'No'}</p>

      <form className="mt-4 flex flex-col gap-4" onSubmit={handleUpdate}>
        <label>
          Specialization:
          <input
            className="w-full p-2 bg-gray-800 text-white rounded"
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </label>
        <label>
          Bio:
          <textarea
            className="w-full p-2 bg-gray-800 text-white rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <button
          className="bg-purple-600 hover:bg-purple-700 p-2 rounded text-white"
          type="submit"
        >
          Update Profile
        </button>
      </form>
      {message && <p className="mt-2 text-green-400">{message}</p>}
    </div>
  )
}
