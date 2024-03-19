import { useEffect, useState } from "react"
import axios from "axios"
import { Textarea } from "../../components/ui/textarea"
import { Switch } from "../../components/ui/switch"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export default function StartMessage() {
    const [isInitMessage, SetIsInitMessage] = useState(false)
    const [initMessage, setInitMessage] = useState('')

    const loadInitMessage = async () => {
        await axios.get('/api/v1/init-message').then(res => {
            const data = res.data.data
            SetIsInitMessage(data.is_init_message)
            setInitMessage(data.init_message)
        })
    }

    const setInitMessageActive = async (status) => {
        await axios.put('/api/v1/init-message', {
            is_init_message: status,
            init_message: initMessage
        })
        SetIsInitMessage(status)
    }

    const updateInitMessage = async () => {
        await axios.put('/api/v1/init-message', {
            is_init_message: isInitMessage,
            init_message: initMessage
        })
    }

    useEffect(() => {
        loadInitMessage()
    }, [])

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-white">
                    <TableHead className="px-5">Initial Message</TableHead>
                    <TableHead className="flex justify-end items-center px-5">
                        <Switch checked={isInitMessage} onCheckedChange={() => setInitMessageActive(!isInitMessage)} />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="hover:bg-white">
                    <TableCell colSpan="2" className="p-5">
                        <Textarea rows="5" placeholder="Welcome to bot..." value={initMessage} onChange={(e) => setInitMessage(e.target.value)} />
                        <div className="flex items-start justify-between mt-5">
                            <p className="text-xs text-gray-500 mr-5">Initial messages are used to respond to users when they first contact the bot.</p>

                            <Button onClick={updateInitMessage}>Save</Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}