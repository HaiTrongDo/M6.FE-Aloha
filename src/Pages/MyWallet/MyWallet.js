import NavbarExtra from "../../Components/NavbarExtra";
import {useEffect, useState} from "react";
import axios from 'axios'

export default function MyWallet() {
    const [wallets, setWallets] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/wallet/render').then(r => {
            setWallets(r.data.data)
        })

    }, [])
    console.log(wallets)
    return (
        <div>
            <NavbarExtra/>
            <div className="flex justify-center bg-[#E4E4E4] h-[100vh]">
                <div className=" border mt-[100px] border-none w-[664px] text-xs text-gray-900">
                    <div
                        className="text-left text-[#707070] px-6 py-2 border-b border-gray-200 w-[664px] h-[40px] bg-[#F4F4F4]  cursor-pointer">
                        Included in Total
                    </div>
                    {wallets.map(wallet => {
                        return(
                            <div className="text-left hover:bg-[#E6EFE7] flex px-6 py-2 round-[10px]  w-[664px] h-[72px] bg-[#FFFFFF] text-black cursor-pointer">
                                <img src={wallet.icon.url} className="w-10 h-10 rounded-full my-2" alt="thinh"/>
                                <div className="px-3">
                                <h3 className="font-sans my-1 text-[14px]">{wallet.name}</h3>
                                <span className="text-[#949494]">+{wallet.initial} {wallet.currency.code}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

