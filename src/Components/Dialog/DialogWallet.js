import {useDispatch, useSelector} from "react-redux";
import {closeDialogWallet, openDialogWallet} from "../../Features/DiaLogSlice/openDialogMyWalletSlice";
import {useEffect, useState} from "react";
import axios from "axios";
import '../../Pages/MyWallet/MyWallet.css';
import DialogIcons from "../Dialog/DialogIcons";
import DialogCurrency from "../Dialog/DialogCurrency";
import {openDialogIcons} from "../../Features/DiaLogSlice/openDialogIconsSlice";
import {openDialogCurrency} from "../../Features/DiaLogSlice/openDialogCurrencySlice";

export default function DialogWallet({className}) {
    const [walletObj, setWalletObj] = useState({
        nameWallet: '',
        initial: ''
    })

    const [iconObj, setIconObj] = useState({
        url: 'https://static.moneylover.me/img/icon/icon_not_selected.png'
    })
    const [currencyObj, setCurrencyObj] = useState({
        url: 'https://static.moneylover.me/img/icon/icon_not_selected.png'
    })
    const dispatch = useDispatch();

    const handleIcon = (iconObj) => {
        setIconObj(iconObj)
    }

    const handleCurrency = (currencyObj) => {
        setCurrencyObj(currencyObj)
    }

    const handleCloseDialogWallet = () => {
        dispatch(closeDialogWallet(false))
    }

    const currentUser = JSON.parse(localStorage.getItem('alohaUser'));

    const iconsState = useSelector((state) =>
        state.DialogIcons.value
    )

    const wallet = useSelector((state) =>
        state.wallet
    )

    const currencyState = useSelector((state) =>
        state.DialogCurrency.value
    )

    const handleOpenDialogIcons = (e) => {
        e.preventDefault()
        dispatch(openDialogIcons(true))
    }

    const handleOpenDialogCurrency = (e) => {
        e.preventDefault()
        dispatch(openDialogCurrency(true))
    }


    const handleChangeInput = (e) => {
        setWalletObj({
            ...walletObj,
            [e.target.name]: e.target.value,
        })
    }

    const walletData = {
        name: walletObj?.nameWallet,
        initial: +walletObj?.initial,
        icon: iconObj?._id,
        currency: currencyObj?._id,
        user: currentUser?._id
    }


    const handleAddWallet = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/wallet/add', walletData).then(response => {
            handleCloseDialogWallet()
        })

    }


    return (
        <div>
            <div
                className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-[5px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Create Wallet
                            </h3>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={handleOpenDialogIcons}
                                    className=" flex  justify-center border border-gray-300 p-2 h-[60px] rounded-[10px] hover:border-black">
                                    <img className="w-10 h-10 rounded-full my-0.5" src={iconObj?.url}
                                         alt="..."/>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-6 w-6 my-2 mx-2 text-[#757575] hover:text-black" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>
                                <div className="relative col-span-2">
                                    <input type="text" id="floating_filled"
                                           onChange={handleChangeInput}
                                           name={"nameWallet"}
                                           className="block rounded-[10px] p-2 pt-5 w-[296px] h-[60px] text-sm text-gray-900 bg-gray-50  border border-gray-300  appearance-none dark:text-black  focus:outline-none focus:ring-0 hover:border-black peer"
                                           placeholder=" "/>
                                    <label htmlFor="floating_filled"
                                           className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Wallet
                                        name
                                    </label>
                                </div>
                                <button
                                    onClick={handleOpenDialogCurrency}
                                    id="button"
                                    className="col-span-2 flex relative  border border-gray-300 p-2 h-[60px]  rounded-[10px] hover:border-black">
                                    <img className="w-[24px] h-[24px] rounded-full my-3"
                                         src={currencyObj?.url}
                                         alt="..."/>
                                    <span className="my-3 mx-4">{wallet?.currencyObj?.name}</span>
                                    <label htmlFor="button"
                                           className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Currency</label>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-6 w-6 mx-[48px] my-3 text-[#757575] hover:text-black "
                                         fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </button>

                                <div className="relative">
                                    <input type="number" id="floating_filled_init"
                                           onChange={handleChangeInput}
                                           name={"initial"}
                                           className="block   rounded-[10px] p-2 pt-5 w-[140px] h-[60px] text-sm text-gray-900 bg-gray-50  border border-gray-300  appearance-none dark:text-black  focus:outline-none focus:ring-0 hover:border-black peer appearance-none"
                                           placeholder=" "/>
                                    <label htmlFor="floating_filled_init"
                                           className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Initial
                                        Balance
                                    </label>
                                </div>
                            </div>
                        </div>
                        {iconsState && <DialogIcons onHandleIcon={handleIcon}/>}
                        {currencyState && <DialogCurrency onHandleCurrency={handleCurrency}/>}
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleCloseDialogWallet}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleAddWallet}
                            >
                                Create wallet
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"/>
        </div>
    )
}

