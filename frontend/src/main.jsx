import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Chat from './pages/Chat'
import Dashboard from './pages/Dashboard'
import './index.css'
import ChatUser, { getChatUser } from './components/ChatUser'
import Setting from './pages/Setting'
import ChatIndex from './components/ChatIndex'
import axios from 'axios'
import { ChatProvider } from './store'

axios.defaults.baseURL = 'http://localhost:8080'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'chat',
        element: <Chat />,
        children: [
          {
            index: true,
            element: <ChatIndex />,
          },
          {
            path: ':chatId',
            element: <ChatUser />,
            loader: getChatUser
          },
        ],
      },
      {
        path: 'setting',
        element: <Setting />,
      }
    ],
    // errorElement: <div>404</div>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
  </React.StrictMode>,
)
