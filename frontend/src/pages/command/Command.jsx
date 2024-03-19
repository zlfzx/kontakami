import { lazy, useEffect, useState } from 'react'
import axios from 'axios'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const AddCommand = lazy(() => import('./AddCommand'))
const StartMessage = lazy(() => import('./StartMessage'))

export default function Command() {

    const [isOpen, setIsOpen] = useState(false)
    const [commands, setCommands] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [selectedCommand, setSelectedCommand] = useState({})
    const [loadingCommands, setLoadingCommands] = useState(false)

    const getCommands = async () => {
        setLoadingCommands(true)

        const req = await axios.get('/api/v1/command')
        const data = req.data
        const listCommand = data.data

        setCommands(listCommand)
        setLoadingCommands(false)
    }

    useEffect(() => {
        getCommands()
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

    const modalAddCommand = () => {
        setIsEdit(false)
        setIsOpen(true)
    }

    const modalEditCommand = (command) => {
        setSelectedCommand(command)
        setIsEdit(true)
        setIsOpen(true)
    }

    const deleteCommand = async (command) => {
        if (confirm(`Do you want to delete command /${command.command}?`)) {
            await axios.delete(`/api/v1/command/${command.id}`)
                .then((res) => {
                    const newCommands = commands.filter((cmd) => {
                        return cmd.id != command.id
                    })
                    setCommands(newCommands)

                    alert('Command deleted')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const setListCommand = (command) => {
        if (isEdit) {
            const newCommands = commands.map((cmd) => {
                if (cmd.id == command.id) {
                    return command
                }
                return cmd
            })

            setCommands(newCommands)
        } else {
            setCommands([...commands, command])
        }
    }

    return (
        <>
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Command
            </h1>
            <h2 className="text-gray-400 text-md mb-5">
                Command is used to handle automatic messages
            </h2>

            <Button onClick={modalAddCommand}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M8 20l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4h4z"></path>
                    <path d="M13.5 6.5l4 4"></path>
                    <path d="M16 18h4m-2 -2v4"></path>
                </svg>
                Add Command
            </Button>

            <div className="flex flex-row items-start gap-5 mt-6">
                <div className="basis-2/3 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Command</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Active</TableHead>
                                <TableHead>&nbsp;</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loadingCommands ? (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        Fetching data...
                                    </TableCell>
                                </TableRow>
                            ) :
                                commands.length > 0 ? (
                                    <>
                                        {commands?.map((command) => (
                                            <TableRow key={command.id}>
                                                <TableCell className="px-5 py-5">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        /{command.command} <br />
                                                        <span className="text-gray-500">{command.description}</span>
                                                    </p>
                                                </TableCell>
                                                <TableCell className="px-5 py-5">
                                                    <p className="text-gray-900 whitespace-pre-wrap">
                                                        {command.message}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="px-5 py-5">
                                                    <Switch checked={command.is_active} onCheckedChange={() => setActive(command.id, !command.is_active)} />
                                                </TableCell>
                                                <TableCell className="px-5 py-5">
                                                    <div className="flex justify-center items-center">
                                                        <Button onClick={() => modalEditCommand(command)} className="bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 opacity-70" size="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                                                <path d="M16 5l3 3"></path>
                                                            </svg>
                                                        </Button>

                                                        <span className="w-2"></span>

                                                        <Button onClick={() => deleteCommand(command)} className="bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200" size="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <path d="M4 7l16 0"></path>
                                                                <path d="M10 11l0 6"></path>
                                                                <path d="M14 11l0 6"></path>
                                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="px-5 py-5">
                                            <p className="text-gray-900 whitespace-no-wrap text-center">
                                                No commands found
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </div>
                <div className="basis-1/3 bg-white">
                    <StartMessage />
                </div>
            </div>

            <AddCommand
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                setCommands={(command) => setListCommand(command)}
                isEdit={isEdit}
                data={selectedCommand}
            />

        </>
    )
}