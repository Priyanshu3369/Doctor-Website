import React, { useEffect, useState } from 'react'

export default function ProtectedRoute({ role, children }) {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setAuthorized(false)
      setLoading(false)
      return
    }

    fetch(`http://localhost:5000/api/dashboard/${role}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Unauthorized')
      })
      .then(data => {
        console.log(data)
        setAuthorized(true)
      })
      .catch(err => {
        console.error(err)
        setAuthorized(false)
      })
      .finally(() => setLoading(false))
  }, [role])

  if (loading) return <div className="p-8">Checking access...</div>
  if (!authorized) return <div className="p-8 text-red-400">Unauthorized</div>

  return <>{children}</>
}
