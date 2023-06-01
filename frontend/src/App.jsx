import { useContext, useEffect } from 'react'
import Sidebar from './layouts/Sidebar'
import Wrapper from './layouts/Wrapper'
import { Toaster } from 'react-hot-toast'
import { ChatContext } from './store'

let pathPhoto
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    pathPhoto = 'http://localhost:8080/storage/profiles/'
} else {
    pathPhoto = '/storage/profiles/'
}

function App() {

  const [state, dispatch] = useContext(ChatContext)

  const requestNotificationPermission = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('granted')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const showNotification = (data) => {
    const name = data?.first_name + ' ' + data?.last_name
    const profilPhoto = !!data?.profile_photo ? pathPhoto + data.profile_photo : userIcon

    const notification = new Notification(name, {
      body: data?.message?.text,
      icon: profilPhoto,
    })

    notification.onclick = (e) => {
      window.location.href = `/chat/${data.id}`
    }
  }

  useEffect(() => {
    requestNotificationPermission()

    const ws = new WebSocket('ws://localhost:8080/ws/chat')
    ws.onopen = () => {
      console.log('connected')
    }

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      const path = window.location.pathname

      if (!path.includes(`/chat/${data.id}`)) {
        if (!!data.message.user_id) {
          showNotification(data)
        }
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
