import { useEffect, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import ChatItem from './ChatItem'
import axios from 'axios'
import { ChatContext } from '../../store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Chat() {

    const [state, dispatch] = useContext(ChatContext)

    const getChats = async () => {
        const req = await axios.get('/api/v1/chat')
        const data = req.data.data

        dispatch({ type: 'SET_CHATS', payload: data })

        let unread = 0
        data.forEach(element => {
            unread += element.unread_messages
        });
        dispatch({ type: 'SET_UNREAD', payload: unread })
    }

    useEffect(() => {
        getChats()
        console.log('getChats')
    }, [])

    useEffect(() => {
        if (state.newChat != null) {

            let chatExist = false
            for (let i = 0; i < state.chats.length; i++) {
                if (state.chats[i].id == state.newChat.id) {
                    chatExist = true
                    break
                }
            }

            if (!chatExist) {
                dispatch({ type: 'SET_CHATS', payload: [state.newChat, ...state.chats] })
            }


            // dispatch({ type: 'SET_CHATS', payload: [...state.chats, state.newChat] })
        }
    }, [state.newChat])

    return (
        <div className="grid grid-cols-3 gap-4 w-full h-full">
            <Card className="col-span-1 rounded-none h-full flex flex-col overflow-y-hidden">
                <CardHeader className="border-b">
                    <CardTitle>Conversation</CardTitle>
                    <CardDescription>List conversation</CardDescription>
                </CardHeader>
                <ScrollArea className="h-full">
                    {state.chats?.map((chat) => (
                        <ChatItem key={chat.id} chat={chat} />
                    ))}
                    {/* delete soon */}
                    {/* {state.chats?.map((chat) => (
                        <ChatItem key={chat.id} chat={chat} />
                    ))}
                    {state.chats?.map((chat) => (
                        <ChatItem key={chat.id} chat={chat} />
                    ))} */}
                </ScrollArea>
            </Card>

            <Card className="col-span-2 rounded-none h-full flex flex-col overflow-y-hidden">
                <Outlet />
            </Card>
        </div>
    )
}