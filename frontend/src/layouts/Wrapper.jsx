import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Wrapper() {

    return (
        <div className="flex flex-col w-full md:space-y-4">
            <Header />
            <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
                <Outlet />
            </div>
        </div>
    )
}