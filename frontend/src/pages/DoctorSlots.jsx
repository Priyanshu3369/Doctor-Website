import React, { useState, useEffect } from 'react'

export default function DoctorSlots() {
  const [slots, setSlots] = useState([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')

  const fetchSlots = () => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:5000/api/doctor/slots', {
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

  const handleCreate = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    fetch('http://localhost:5000/api/doctor/slots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ date, time })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message)
        setDate('')
        setTime('')
        fetchSlots()
      })
  }

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-900 rounded-xl shadow-lg text-white">
      <h1 className="text-2xl mb-4 text-purple-400">Create Appointment Slot</h1>
      <form className="flex flex-col gap-4" onSubmit={handleCreate}>
        <label>
          Date:
          <input
            type="date"
            className="w-full p-2 bg-gray-800 text-white rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            className="w-full p-2 bg-gray-800 text-white rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <button
          className="bg-purple-600 hover:bg-purple-700 p-2 rounded"
          type="submit"
        >
          Create Slot
        </button>
      </form>
      {message && <p className="mt-2 text-green-400">{message}</p>}

      <h2 className="mt-8 text-xl text-purple-400">Your Slots:</h2>
      <ul className="mt-2">
        {slots.map(slot => (
          <li key={slot._id} className="border-b border-gray-700 py-2">
            {slot.date} — {slot.time} — {slot.is_booked ? 'Booked' : 'Available'}
          </li>
        ))}
      </ul>
    </div>
  )
}
