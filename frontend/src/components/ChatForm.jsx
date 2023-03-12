import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../store"

let pathFile
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    pathFile = 'http://localhost:8080/storage/'
} else {
    pathFile = '/storage/'
}

export default function ChatForm({ chatId }) {

    const [state, dispatch] = useContext(ChatContext)
    const [message, setMessage] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [tempImage, setTempImage] = useState(null)

    const sendChat = async (e) => {
        e.preventDefault()
        if (message == '' && !selectedFile) return

        const formData = new FormData()
        formData.append('text', message)

        if (!!state.replyTo) {
            data.message_id = state.replyTo.id
            formData.append('message_id', state.replyTo.id)
        }

        if (!!selectedFile) {
            formData.append('file', selectedFile)
        }

        await axios.post(`/api/v1/chat/${chatId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res)
            const data = res.data
            const msg = data.data

            dispatch({ type: 'SET_MESSAGES', payload: [...state.messages, msg] })
            setMessage('')
            dispatch({ type: 'SET_REPLY_TO', payload: null })
            setSelectedFile(null)
            setTempImage(null)
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

    const closeReply = () => {
        dispatch({ type: 'SET_REPLY_TO', payload: null })
    }

    useEffect(() => {
        setMessage('')
        dispatch({ type: 'SET_REPLY_TO', payload: null })
    }, [chatId])

    const onSelectFile = (e) => {
        const file = e.target.files[0]
        
        if (!file) return

        setSelectedFile(file)
        setTempImage(URL.createObjectURL(file))
    }

    const closePreview = () => {
        setSelectedFile(null)
        setTempImage(null)
    }

    return (
        <>
            {!!state.replyTo && (
                <div className="text-gray-500 flex items-center justify-between mb-5">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-corner-up-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M18 18v-6a3 3 0 0 0 -3 -3h-10l4 -4m0 8l-4 -4"></path>
                        </svg>
                    </div>
                    <div className="w-full px-4 text-left flex">
                        {!!state.replyTo.file && state.replyTo.file.type == 'photo' && (
                            <div className="mr-3">
                                <img src={pathFile + 'files/photo/' + state.replyTo.file.file_name} alt="" className="w-10" loading="lazy" />
                            </div>
                        )}
                        <div>
                            {state.replyTo.text}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={closeReply}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M18 6l-12 12"></path>
                                <path d="M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            {!!tempImage && (
                <div className="text-gray-500 flex items-center justify-between mb-3">
                    <div className="w-full">
                        <img src={tempImage} alt="" className="w-1/3" loading="lazy" />
                    </div>
                    <div className="flex items-center">
                        <button onClick={closePreview}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M18 6l-12 12"></path>
                                <path d="M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            <form className="bg-white shadow flex" onSubmit={sendChat}>
                <div className="flex-1 flex items-center">
                    <div className="pl-4 text-gray-500 cursor-pointer">
                        <div className="relative inline-block w-full text-center cursor-pointer">
                            <label htmlFor="file" className="text-gray-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-paperclip inline-block" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5"></path>
                                </svg>
                            </label>
                            <input id="file" onChange={onSelectFile} accept="image/*" name="file" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                    </div>
                    <textarea name="" rows="1" className="w-full block outline-none py-3 px-4 bg-transparent border-none  focus:ring-0 resize-none" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={onEnterPress}></textarea>
                </div>
                <div className="flex-2 flex justify-center">
                    <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-0 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center shadow focus:outline-none">Send</button>
                </div>
            </form>
        </>
    )
}