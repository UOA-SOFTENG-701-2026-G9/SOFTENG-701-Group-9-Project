import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import '../resources/App.css'
import Navbar from './components/Navbar'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/api`)
        const data = await response.json()
        setMessage(data.message || '')
      } catch (error) {
        console.error('Failed to fetch message:', error)
      }
    }
    fetchMessage()
  }, [])

  return (
    <div>
      <Navbar />
      <div>Message from backend: {message}</div>
    </div>
  )
}

export default App
