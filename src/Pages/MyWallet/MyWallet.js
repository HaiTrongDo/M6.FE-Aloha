import NavbarExtra from "../../Components/NavbarExtra";
import {useEffect, useState} from "react";


export default function MyWallet() {
    const [wallet, setWallet] = useState()

    useEffect(() => {
        const axios = async () => {
            const data =  axios.get('http://localhost:8080/wallet/render')
        }
        axios().then(result => {
            console.log(result)
        })
    }, [wallet])
    return (
        <div>
            <NavbarExtra/>
            <div className="flex h-screen justify-center items-center">
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">Profile</li>
                    <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">Settings</li>
                    <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">Messages</li>
                    <li className="py-2 px-4 w-full rounded-b-lg">Download</li>
                </ul>
            </div>
        </div>
    )
}

