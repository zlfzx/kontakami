import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Loader from './components/Loader'
import axios from 'axios'
import { Suspense } from 'react'
import { ChatProvider } from './store'

const App = lazy(() => import('./App'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Chat = lazy(() => import('./pages/Chat'))
const ChatIndex = lazy(() => import('./components/ChatIndex'))
const ChatUser = lazy(() => import('./components/ChatUser'))
const Command = lazy(() => import('./pages/Command'))
const Setting = lazy(() => import('./pages/Setting'))

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
          },
        ],
      },
      {
        path: 'command',
        element: <Command />,
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
    <Suspense fallback={<Loader />}>
      <ChatProvider>
        <RouterProvider router={router} />
      </ChatProvider>
    </Suspense>
  </React.StrictMode>,
)
