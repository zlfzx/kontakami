import { useEffect, useState } from "react"
import axios from "axios"


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
                        <div className="relative inline-block w-9 align-middle select-none">
                            <input type="checkbox" name="toggle" id="check-start"
                                className="checked:bg-green-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                checked={greeting ? 'checked' : ''}
                                onChange={() => setGreetingActive(!greeting)}
                            />
                            <label htmlFor="check-start" className="block h-5 overflow-hidden bg-gray-300 rounded-full cursor-pointer"></label>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="px-5 py-5 text-sm" colSpan="2">
                        <textarea name="" id="" cols="30" rows="5" className="block w-full border-gray-300 shadow-sm focus:border-purple-500 focus:ring-0 sm:text-sm" placeholder="Welcome to bot..." value={greetingMessage} onChange={(e) => setGreetingMessage(e.target.value)}></textarea>

                        <div className="flex items-start justify-between mt-5">
                            <p className="text-xs text-gray-500 mr-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae exercitationem tenetur libero illum facere ab.</p>
                            <button
                                type="submit"
                                className="inline-flex justify-center border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                onClick={updateGreetingMessage}
                            >
                                Save
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}