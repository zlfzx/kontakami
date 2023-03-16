import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import userIcon from '../assets/user.png'
import { ChatContext } from '../store'
import BubbleChat from './BubbleChat'
import ChatForm from './ChatForm'

let pathPhoto
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    pathPhoto = 'http://localhost:8080/storage/profiles/'
} else {
    pathPhoto = '/storage/profiles/'
}

export default function ChatUser() {
    const { chatId } = useParams()

    const [state, dispatch] = useContext(ChatContext)
    const [chat, setChat] = useState({})

    const getChatUsers = async () => {
        const req = await axios.get(`/api/v1/chat/${chatId}`)
        const chatUser = req.data.data

        setChat(chatUser)
        dispatch({ type: 'SET_MESSAGES', payload: chatUser?.messages })

        if (!!chatUser?.unread_messages && chatUser?.unread_messages > 0) {
            axios.post(`/api/v1/chat/${chatUser.id}/read`)
        }
    }

    const profilPhoto = !!chat?.profile_photo ? pathPhoto + chat.profile_photo : userIcon

    const scrollRef = useRef(null)
    const scrollToBottom = () => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }

    useEffect(() => {
        getChatUsers()
        scrollToBottom()

        const ws = new WebSocket(`ws://localhost:8080/ws/chat/${chatId}`)
        ws.onopen = (e) => {
            console.log('connected chat user')
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            const path = window.location.pathname

            if (path.includes(`/chat/${data.id}`)) {
                dispatch({ type: 'SET_MESSAGES', payload: [...state.messages, data.message] })
            }
        }

        return () => {
            console.log('cleanup chat user')
            ws.close()
        }
    }, [chatId])

    useEffect(() => {
        scrollToBottom()
    }, [state.messages])

    return (
        <>
            <div className="w-full px-4 py-5 border-b sm:px-6 flex flex-row">
                <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                    <a href="#" className="relative block">
                        <img alt="profil" src={profilPhoto} className="mx-auto object-cover rounded-full h-10 w-10 " />
                    </a>
                </div>
                <div className="flex-1 pl-1 md:mr-16">
                    <div className="font-medium dark:text-white">
                        {chat?.first_name + ' ' + chat?.last_name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-200">
                        {chat?.username}
                    </div>
                </div>
            </div>

            <div className="chat h-full px-4 pb-3 overflow-y-auto" ref={scrollRef}>
                <div className="flex flex-col justify-start items-center w-full">
                    {state.messages?.map((message, index) => {
                        let replyTo = null
                        if (!!message.message_id) {
                            replyTo = state.messages.find(m => m.id == message.message_id)
                        }
                        return (
                            <BubbleChat key={index} message={message} replyTo={replyTo} />
                        )
                    }
                    )}
                </div>
            </div>

            <div className="w-full bg-gray-100 px-4 py-5">
                <ChatForm chatId={chatId} />
            </div>
        </>
    )
}
