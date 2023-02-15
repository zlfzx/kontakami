import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function AddCommand({ isOpen, closeModal }) {
    // let [isOpen, setIsOpen] = useState(false)

    // function closeModal() {
    //     setIsOpen(false)
    // }

    // function openModal() {
    //     setIsOpen(true)
    // }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                    Add Command
                                </Dialog.Title>
                                <div className="mt-3">
                                    <form action="#" method="POST">
                                        <div className="space-y-6 ">
                                            <div>
                                                <label htmlFor="company-website" className="block text-sm font-medium text-gray-500">Command</label>
                                                <div className="mt-1 flex shadow-sm">
                                                    <span className="inline-flex items-center border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">/</span>
                                                    <input type="text" name="company-website" id="company-website" className="block w-full flex-1 rounded-none border-gray-300 focus:border-purple-500 focus:ring-0  sm:text-sm" placeholder="command" />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-500">Message</label>
                                                <div className="mt-1">
                                                    <textarea id="message" name="message" rows="3" className="mt-1 px-2 py-1 block w-full border-gray-300 shadow-sm focus:border-purple-500 focus:ring-0 sm:text-sm" placeholder="lorem ipsum dolor sit amet"></textarea>
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
                                                    type="button"
                                                    className="inline-flex justify-center border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
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