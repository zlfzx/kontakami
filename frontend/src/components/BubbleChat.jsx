import { useContext } from "react"
import { ChatContext } from "../store"

let pathFile
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    pathFile = 'http://localhost:8080/storage/'
} else {
    pathFile = '/storage/'
}

export default function BubbleChat(props) {

    const [state, dispatch] = useContext(ChatContext)

    const message = props.message
    const position = !!message.user_id ? 'items-start' : 'items-end'
    const bg = position == 'items-start' ? 'bg-blue-100' : 'bg-blue-300'

    const createdAt = !!message.date ? new Date(message.date * 1000) : new Date()
    let date = createdAt.getDate() < 10 ? '0' + createdAt.getDate() : createdAt.getDate()
    let month = (createdAt.getMonth() + 1) < 10 ? '0' + (createdAt.getMonth() + 1) : (createdAt.getMonth() + 1)
    let year = createdAt.getFullYear()
    let showCreatedAt = date + '/' + month + '/' + year

    let hours = createdAt.getHours() < 10 ? '0' + createdAt.getHours() : createdAt.getHours()
    let minutes = createdAt.getMinutes() < 10 ? '0' + createdAt.getMinutes() : createdAt.getMinutes()
    showCreatedAt += ' ' + hours + ':' + minutes

    const replyTo = props.replyTo

    const showFile = (message) => {
        const file = message.file
        if (!!file) {
            if (file.type == 'photo') {
                return (
                    <img src={pathFile + 'files/photo/' + file.file_name} loading="lazy" className="w-full h-full select-none" />
                )
            }
        }
    }

    const clickBubble = () => {
        dispatch({ type: 'SET_REPLY_TO', payload: message })
    }

    return (
        <div className={"w-full py-2 flex flex-col justify-start " + position} onDoubleClick={clickBubble}>
            <div className={bg + " shadow-md min-w-min max-w-lg whitespace-pre-wrap"}>
                {!!replyTo && (
                    <div className={"bg-blue-200 shadow-md text-gray-600 border-l-2 border-blue-400" + (!!replyTo.file ? ' mx-2 mt-2' : ' mx-1 mt-1')}>
                        {showFile(replyTo)}
                        {!!replyTo.text && (
                            <div className="px-2 py-1">
                                {replyTo.text}
                            </div>
                        )}
                    </div>
                )}
                {showFile(message)}
                {!!message.text && (
                    <div className="px-2 py-1 mx-1 text-gray-800">
                        {message.text}
                    </div>
                )}
            </div>
            <span className='text-xs py-1 text-gray-400 select-none'>{showCreatedAt}</span>
        </div>
    )
}