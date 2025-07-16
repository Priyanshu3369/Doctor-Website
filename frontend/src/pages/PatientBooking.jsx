import React, { useEffect, useState } from 'react'

export default function PatientBooking() {
  const [slots, setSlots] = useState([])
  const [message, setMessage] = useState('')

  const fetchSlots = () => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:5000/api/patient/slots', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setSlots(data))
  }

  useEffect(() => {
    fetchSlots()
  }, [])

  const handleBook = (slotId) => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:5000/api/patient/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ slot_id: slotId })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message)
        fetchSlots()
      })
  }

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-900 rounded-xl shadow-lg text-white">
      <h1 className="text-2xl mb-4 text-purple-400">Available Slots</h1>
      {slots.length === 0 && <p>No slots available</p>}
      <ul className="space-y-4">
        {slots.map(slot => (
          <li key={slot._id} className="border-b border-gray-700 py-2 flex justify-between items-center">
            <div>
              {slot.date} — {slot.time} — Dr. {slot.doctor_email}
            </div>
            <button
              onClick={() => handleBook(slot._id)}
              className="bg-purple-600 hover:bg-purple-700 p-2 rounded"
            >
              Book
            </button>
          </li>
        ))}
      </ul>
      {message && <p className="mt-4 text-green-400">{message}</p>}
    </div>
  )
}
