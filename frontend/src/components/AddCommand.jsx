import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'

export default function AddCommand({ isOpen, closeModal, setCommands, isEdit, data }) {
    const [commandId, setCommandId] = useState('')
    const [command, setCommand] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (isEdit) {
            setCommandId(data.id)
            setCommand(data.command)
            setDescription(data.description)
            setMessage(data.message)
        }
    }, [isEdit, data])

    const submitForm = async (e) => {
        e.preventDefault()
        console.log('submit form')

        if (isEdit) {
            editCommand()
        } else {
            addCommand()
        }

    }

    const addCommand = async () => {
        await axios.post('/api/v1/command', {
            command: command,
            description: description,
            message: message
        }).then((res) => {
            console.log(res)
            const command = res.data.data
            setCommands(command)
            closeModal()
            resetForm()
        }).catch((err) => {
            console.log(err)
        })
    }

    const editCommand = async () => {
        await axios.put(`/api/v1/command/${commandId}`, {
            command: command,
            description: description,
            message: message
        }).then((res) => {
            console.log(res)
            const command = res.data.data
            setCommands(command)
            closeModal()
            resetForm()
        }).catch((err) => {
            console.log(err)
        })
    }

    const resetForm = () => {
        setCommand('')
        setDescription('')
        setMessage('')
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {!isEdit ? 'Add' : 'Edit'} Command
                                </Dialog.Title>
                                <div className="mt-3">
                                    <form action="#" method="POST" onSubmit={submitForm}>
                                        <div className="space-y-6 ">
                                            <div>
                                                <label htmlFor="form-command" className="block text-sm font-medium text-gray-500">Command</label>
                                                <div className="mt-1 flex shadow-sm">
                                                    <span className="inline-flex items-center border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">/</span>
                                                    <input type="text" name="command" value={command} onChange={(e) => setCommand(e.target.value)} id="form-command" className="block w-full flex-1 rounded-none border-gray-300 focus:border-blue-500 focus:ring-0  sm:text-sm" placeholder="command" required />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="form-description" className="block text-sm font-medium text-gray-500">Description</label>
                                                <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} id="form-description" className="block w-full flex-1 rounded-none border-gray-300 focus:border-blue-500 focus:ring-0  sm:text-sm" placeholder="command description" required />
                                            </div>

                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-500">Message</label>
                                                <div className="mt-1">
                                                    <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="3" className="mt-1 px-2 py-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-0 sm:text-sm" placeholder="lorem ipsum dolor sit amet" required></textarea>
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mr-2"
                                                    onClick={closeModal}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}