import { useContext, useEffect } from 'react'
import './App.css'
import Sidebar from './layouts/Sidebar'
import Wrapper from './layouts/Wrapper'
import { Toaster } from 'react-hot-toast'
import ChatNotification from './components/ChatNotification'
import { ChatContext } from './store'

function App() {

  const [state, dispatch] = useContext(ChatContext)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws/chat')
    ws.onopen = () => {
      console.log('connected')
    }

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      const path = window.location.pathname

      if (!path.includes(`/chat/${data.id}`)) {
        ChatNotification(data)
      }

      dispatch({ type: 'SET_NEW_CHAT', payload: data })
    }

    return () => {
      ws.close()
    }

  }, [])

  return (
    <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <Sidebar />
        <Wrapper />
        <Toaster />
      </div>
    </main>
  )
}

export default App
