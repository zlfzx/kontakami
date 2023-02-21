import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import userIcon from '../assets/user.png'
import BubbleChat from './BubbleChat'

let pathPhoto
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    pathPhoto = 'http://localhost:8080/storage/profiles/'
} else {
    pathPhoto = '/storage/profiles/'
}

export default function ChatUser() {
    const { chatId } = useParams()

    const [chat, setChat] = useState({})
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    const getChatUsers = async () => {
        const req = await axios.get(`/api/v1/chat/${chatId}`)
        const chatUser = req.data.data

        setChat(chatUser)
        setMessages(chatUser?.messages)
    }

    const profilPhoto = !!chat?.profile_photo ? pathPhoto + chat.profile_photo : userIcon

    const scrollRef = useRef(null)
    const scrollToBottom = () => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }

    const sendChat = async (e) => {
        e.preventDefault()
        if (message == '') return

        await axios.post(`/api/v1/chat/${chatId}`, {
            text: message
        }).then((res) => {
            console.log(res)
            const data = res.data
            const msg = data.data

            setMessages(messages => [...messages, msg])
            setMessage('')
        }).catch((err) => {
            console.log(err)
        })
    }

    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault()
            sendChat(e)
        }
    }

    useEffect(() => {
        getChatUsers()
        scrollToBottom()
        setMessage('')

        const ws = new WebSocket(`ws://localhost:8080/ws/chat/${chatId}`)
        ws.onopen = (e) => {
            console.log('connected chat user')
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            const path = window.location.pathname

            if (path.includes(`/chat/${data.id}`)) {
                setMessages(messages => [...messages, data.message])
            }
        }

        return () => {
            console.log('cleanup chat user')
            ws.close()
        }
    }, [chatId])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

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
                    {messages?.map((message, index) => {
                        let replyTo = null
                        if (!!message.message_id) {
                            replyTo = messages.find(m => m.id == message.message_id)
                        }
                        return (
                            <BubbleChat key={index} message={message} replyTo={replyTo}>
                                {message.text}
                            </BubbleChat>
                        )}
                    )}
                </div>
            </div>

            <div className="w-full bg-gray-100 px-4 py-5">
                <form className="bg-white shadow rounded flex" onSubmit={sendChat}>
                    <div className="flex-1">
                        <textarea name="" rows="1" className="w-full block outline-none py-3 px-4 bg-transparent focus:border-purple-500 resize-none" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={onEnterPress}></textarea>
                    </div>
                    <div className="flex-2 flex justify-center">
                        <button type="submit" className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-0 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center shadow focus:outline-none">Send</button>
                    </div>
                </form>
            </div>
        </>
    )
}
