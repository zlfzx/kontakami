import { useEffect, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import UserItem from '../components/UserItem'
import axios from 'axios'
import { ChatContext } from '../store'

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
    }, [])

    useEffect(() => {
        console.log('newChat', state.newChat)
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
            <div className="col-span-1 bg-white shadow dark:bg-gray-800 h-full flex flex-col justify-start overflow-y-auto">
                <div className="w-full px-4 py-5 border-b sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Conversation
                    </h3>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
                        List conversation
                    </p>
                </div>
                <div className="h-full overflow-y-auto">
                    <ul className="flex flex-col divide-y divide">
                        {state.chats?.map((chat) => (
                            <UserItem key={chat.id} chat={chat} />
                        ))}
                    </ul>
                </div>
            </div>

            <div className="col-span-2 bg-white shadow dark:bg-gray-800 h-full flex flex-col justify-between overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}