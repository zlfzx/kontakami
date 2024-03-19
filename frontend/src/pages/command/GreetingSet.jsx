import { useEffect, useState } from "react"
import axios from "axios"
import { Textarea } from "../../components/ui/textarea"
import { Switch } from "../../components/ui/switch"
import { Button } from "../../components/ui/button"


export default function GreetingSet() {
    const [greeting, setGreeting] = useState(false)
    const [greetingMessage, setGreetingMessage] = useState('')

    const loadGreeting = async () => {
        await axios.get('/api/v1/greeting').then(res => {
            const data = res.data.data
            setGreeting(data.greeting)
            setGreetingMessage(data.greeting_message)
        })
    }

    const setGreetingActive = async (status) => {
        await axios.put('/api/v1/greeting', {
            greeting: status,
            greeting_message: greetingMessage
        })
        setGreeting(status)
    }

    const updateGreetingMessage = async () => {
        await axios.put('/api/v1/greeting', {
            greeting: greeting,
            greeting_message: greetingMessage
        })
    }

    useEffect(() => {
        loadGreeting()
    }, [])

    return (
        <table className="min-w-full leading-normal">
            <thead>
                <tr>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                        /Start <br />
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 flex justify-end">
                        <Switch checked={greeting} onCheckedChange={() => setGreetingActive(!greeting)} />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="px-5 py-5 text-sm" colSpan="2">
                        <Textarea placeholder="Welcome to bot..." value={greetingMessage} onChange={(e) => setGreetingMessage(e.target.value)} />

                        <div className="flex items-start justify-between mt-5">
                            <p className="text-xs text-gray-500 mr-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae exercitationem tenetur libero illum facere ab.</p>
                            
                            <Button onClick={updateGreetingMessage}>Save</Button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}