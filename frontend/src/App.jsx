import React, { useEffect, useState } from 'react'

function App() {
  const [health, setHealth] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-purple-400">Healthcare Platform</h1>
        {health ? (
          <div className="text-green-400">API Response: {health.message}</div>
        ) : (
          <div className="text-yellow-400">Loading...</div>
        )}
      </div>
    </div>
  )
}

export default App
