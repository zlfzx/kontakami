import { useEffect, useState } from 'react'
import AddCommand from '../components/AddCommand'
import axios from 'axios'
import { useLoaderData } from 'react-router-dom'

export async function getCommands() {
    const req = await axios.get('/api/v1/command')
    const data = req.data
    const listCommand = data.data

    return { listCommand }
}

export default function Command() {

    const [isOpen, setIsOpen] = useState(false)
    const [commands, setCommands] = useState([])

    const { listCommand } = useLoaderData()

    useEffect(() => {
        setCommands(listCommand)
    }, [])

    const setActive = async (id, status) => {
        await axios.put(`/api/v1/command/${id}/update-status`, {
            is_active: status
        }).then((res) => {
            const data = res.data
            const command = data.data
            
            const newCommands = commands.map((cmd) => {
                if (cmd.id == command.id) {
                    return command
                }
                return cmd
            })

            setCommands(newCommands)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Command
            </h1>
            <h2 className="text-gray-400 text-md mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad voluptatem ab sequi vitae, ratione labore?
            </h2>


            <button type="button" onClick={() => setIsOpen(true)} className="py-2 px-3 flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M8 20l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4h4z"></path>
                    <path d="M13.5 6.5l4 4"></path>
                    <path d="M16 18h4m-2 -2v4"></path>
                </svg>
                Add Command
            </button>


            <div className="container max-w-3xl">
                <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden shadow">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        Command
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        Message
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        Active
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        &nbsp;
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {commands?.map((command) => (
                                    <tr key={command.id}>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {command.command}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {command.message}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                <input type="checkbox" name="toggle" id={`check`+command.id}
                                                    className="checked:bg-green-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    checked={command.is_active ? 'checked' : ''}
                                                    onChange={() =>setActive(command.id, !command.is_active)}
                                                />
                                                <label htmlFor={`check`+command.id} className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer">
                                                </label>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <div className="flex justify-center items-center">
                                                <button type="button" className="flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 opacity-70 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                                        <path d="M16 5l3 3"></path>
                                                    </svg>
                                                </button>

                                                <span className="w-2"></span>

                                                <button type="button" className="flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M4 7l16 0"></path>
                                                        <path d="M10 11l0 6"></path>
                                                        <path d="M14 11l0 6"></path>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AddCommand
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                setCommands={(command) => setCommands([...commands, command])}
            />

        </>
    )
}