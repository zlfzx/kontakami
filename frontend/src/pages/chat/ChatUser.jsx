import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import userIcon from '../../assets/user.png'
import { ChatContext } from '../../store'
import BubbleChat from './BubbleChat'
import ChatForm from './ChatForm'
import { CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

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
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight * 2
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
            <CardHeader className="border-b flex flex-row items-center">
                <Avatar className="mr-4">
                    <AvatarImage src={profilPhoto} alt="profil" />
                </Avatar>

                <div>
                    <CardTitle>{chat?.first_name + ' ' + chat?.last_name}</CardTitle>
                    <CardDescription>{chat?.username}</CardDescription>
                </div>
            </CardHeader>

            <ScrollArea className="chat h-full px-4 py-3" ref={scrollRef}>
                {
                    state.messages?.map((message, index) => {
                        let replyTo = null
                        if (!!message.message_id) {
                            replyTo = state.messages.find(m => m.id == message.message_id)
                        }
                        return (
                            <BubbleChat key={index} message={message} replyTo={replyTo} />
                        )
                    }
                )}
            </ScrollArea>

            <div className="w-full bg-gray-100 px-4 py-5">
                <ChatForm chatId={chatId} />
            </div>
        </>
    )
}
