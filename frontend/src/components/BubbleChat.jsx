

export default function BubbleChat(props) {

    const message = props.message
    const position = !!message.user_id ? 'items-start' : 'items-end'
    const bg = position == 'items-start' ? 'bg-purple-100' : 'bg-purple-300'

    const createdAt = !!message.date ? new Date(message.date * 1000) : new Date()
    let date = createdAt.getDate() < 10 ? '0' + createdAt.getDate() : createdAt.getDate()
    let month = (createdAt.getMonth() + 1) < 10 ? '0' + (createdAt.getMonth() + 1) : (createdAt.getMonth() + 1)
    let year = createdAt.getFullYear()
    let showCreatedAt = date + '/' + month + '/' + year

    let hours = createdAt.getHours() < 10 ? '0' + createdAt.getHours() : createdAt.getHours()
    let minutes = createdAt.getMinutes() < 10 ? '0' + createdAt.getMinutes() : createdAt.getMinutes()
    showCreatedAt += ' ' + hours + ':' + minutes

    return (
        <div className={"w-full py-2 flex flex-col justify-start " + position}>
            <div className={bg + " shadow-md px-1 py-1 min-w-min max-w-lg whitespace-pre-wrap"}>
                {(!!props.replyTo) ? (
                    <div className={"bg-purple-200 shadow-md px-2 py-1 text-gray-600 border-l-2 border-purple-400"}>
                        {props.replyTo.text}
                    </div>
                ) : ''}
                <div className="px-2 py-1 text-gray-800">
                    {props.children}
                </div>
            </div>
            <span className='text-xs py-1 text-gray-400'>{showCreatedAt}</span>
        </div>
    )
}