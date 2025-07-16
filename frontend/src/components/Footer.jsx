import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-12 border-t border-gray-700">
      <p>&copy; {new Date().getFullYear()} HealthHub. All rights reserved.</p>
      <p className="mt-2 text-sm">Made with ❤️ for real healthcare flow.</p>
    </footer>
  )
}
