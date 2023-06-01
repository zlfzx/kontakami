import toast from 'react-hot-toast';
import userIcon from '../assets/user.png'
import { NavLink } from 'react-router-dom';

let pathPhoto
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    pathPhoto = 'http://localhost:8080/storage/profiles/'
} else {
    pathPhoto = '/storage/profiles/'
}

export default function ChatNotification(chat) {

    const name = chat?.first_name + ' ' + chat?.last_name
    const profilPhoto = !!chat?.profile_photo ? pathPhoto + chat.profile_photo : userIcon

    return toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <NavLink to={`/chat/${chat.id}`} className="flex-1 w-0 p-4" onClick={() => toast.dismiss(t.id)}>
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={profilPhoto}
                            alt=""
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {chat?.message?.text}
                        </p>
                    </div>
                </div>
            </NavLink>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Close
                </button>
            </div>
        </div>
    ), {
        position: 'top-right',
    })

}