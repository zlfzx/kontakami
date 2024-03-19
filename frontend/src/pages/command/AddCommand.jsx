import { useState, useEffect, lazy } from 'react'
import axios from 'axios'
import { Textarea } from '../../components/ui/textarea'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

const Modal = lazy(() => import('../../components/Modal'))

export default function AddCommand({ isOpen, closeModal, setCommands, isEdit, data }) {
    const [commandId, setCommandId] = useState('')
    const [command, setCommand] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {

        setCommandId('')
        setCommand('')
        setDescription('')
        setMessage('')

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
        <Modal title={!isEdit ? 'Add Command' : 'Edit Command'} isOpen={isOpen} onClose={closeModal}>
            <form action="#" method="POST" onSubmit={submitForm} className="mt-3">
                <div className="space-y-6 ">
                    <div>
                        <label htmlFor="form-command" className="block text-sm font-medium text-gray-500 mb-1">Command</label>
                        <div className="mt-1 flex shadow-sm">
                            <span className="inline-flex items-center border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">/</span>
                            <Input name="command" value={command} onChange={(e) => setCommand(e.target.value)} id="form-command" placeholder="command" required />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="form-description" className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                        <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)} id="form-description" placeholder="command description" required />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-500 mb-1">Message</label>
                        <Textarea id="message" name="message" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="lorem ipsum dolor sit amet" required />
                    </div>

                    <div className="flex justify-end">
                        <Button type="button" onClick={closeModal} className="mr-2" variant="secondary">Cancel</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}