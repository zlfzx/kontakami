import { NavLink } from 'react-router-dom'
import userIcon from '../../assets/user.png'

let pathPhoto
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    pathPhoto = 'http://localhost:8080/storage/profiles/'
} else {
    pathPhoto = '/storage/profiles/'
}

export default function ChatItem({ chat }) {

    const name = chat.first_name + ' ' + chat.last_name

    let lastSent = ''
    if (!!chat.last_sent) {
        const lastSentDate = new Date(chat.last_sent * 1000)
        lastSent = (lastSentDate.getHours() < 10 ? '0' + lastSentDate.getHours() : lastSentDate.getHours()) + ':' + (lastSentDate.getMinutes() < 10 ? '0' + lastSentDate.getMinutes() : lastSentDate.getMinutes())
    }

    const clickItem = () => {
        if (!!chat.unread_messages) {
            chat.unread_messages = 0
        }
    }

    return (
        <NavLink to={`${chat.id}`} className="flex flex-row border-b" onClick={clickItem}>
            <div className="flex items-center flex-1 p-4 cursor-pointer select-none hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                    <span className="relative block">
                        <img alt="profil" src={!!chat.profile_photo ? pathPhoto+chat.profile_photo : userIcon} className="mx-auto object-cover rounded-full h-10 w-10 " />
                    </span>
                </div>
                <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">
                        {name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-200">
                        {chat.username}
                    </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-200">
                    <div>{lastSent}</div>
                    {!!chat.unread_messages && chat.unread_messages > 0 &&
                        <div className='mt-1 text-right'>
                            <span className="w-4 h-2 p-1 text-xs text-gray-500 bg-gray-200 rounded">
                                {chat.unread_messages}
                            </span>
                        </div>
                    }
                </div>
            </div>
        </NavLink>
    )
}