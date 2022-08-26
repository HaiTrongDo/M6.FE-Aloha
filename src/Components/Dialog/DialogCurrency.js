import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {closeDialogCurrency} from "../../Features/DiaLogSlice/openDialogCurrencySlice";
import {setCurrencyObj} from "../../Features/SelectWallet/selectWallet";

export default function DialogIcons() {
    const [currencies, setCurrencies] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:8080/currency/').then(result => {
            setCurrencies(result.data.data);
        })
    }, [])

    const handleCloseDialogCurrencies = () => {
        dispatch(closeDialogCurrency(false))
    }


    return (

        <div>
            <div
                className="justify-center  items-center flex overflow-x-hidden overflow-y-auto modal-dialog modal-dialog-scrollable fixed inset-0 z-50 outline-none focus:outline-none"
                tabIndex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-[5px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start p-5 border-b border-solid border-slate-200 rounded-t m-auto">
                            <button className="pt-1 text-[#757575]" onClick={handleCloseDialogCurrencies}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                            <span className="pl-[15px] text-[20px] font-sans">
                                Currency
                            </span>
                            <form className={""}>
                                <div
                                    className="relative mx-[50px] mb-1 flex w-[208px] h-[40px]   ">
                                    <div
                                        className="flex absolute inset-y-0  left-0 items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search"
                                           className=" pl-10 w-full rounded rounded-[20px] focus:outline-none text-gray-900 bg-[#F5F5F5]  "
                                           placeholder="Search" required/>
                                </div>
                            </form>
                        </div>
                        {/*body*/}
                        <div className="modal-body relative w-[496px] h-[600px] flex-auto p-4">
                            <ul className="grid grid-cols-2 gap-2">
                                {currencies.map((currency, index) => {
                                    return (
                                        <li className="px-3 py-2 hover:bg-[#F0F9F1]" key={index}>
                                            <button onClick={(e)=>{
                                                e.preventDefault();
                                                console.log(currency)
                                                dispatch(setCurrencyObj(currency))
                                                handleCloseDialogCurrencies()
                                            }}
                                            >
                                                <div className={"flex"}>
                                                    <img className={"w-[32px] rounded-[2px] h-[32px]"} src={currency?.url}
                                                         alt="thinh"/>
                                                    <div className={"text-left px-3 text-[13px]"}>
                                                        <span className={""}>{currency?.name}</span>
                                                        <p className={"text-[#6E726F]"}>{currency?.code}</p>
                                                    </div>
                                                </div>

                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        {/*footer*/}
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"/>
        </div>

    )
}
