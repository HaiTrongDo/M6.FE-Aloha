import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeDialogTransaction} from "../../Features/DiaLogSlice/openDialogTransactionSlice";
import axios from '../../axios/index';
import {openDialogCategory, closeDialogCategory} from "../../Features/DiaLogSlice/openDialogCategorySlice";
import {selectCategory} from "../../Features/DiaLogSlice/categorySlice";
import {openDialogSelectWallet} from "../../Features/DiaLogSlice/openDialogWallet";
import {selectWallet} from "../../Features/DiaLogSlice/walletSlice";


const DialogTransaction = () => {
    const dispatch = useDispatch();
    const [listCategory, setListCategory] = useState([]);
    const [category, setCategory] = useState('');
    const [listWallet, setListWallet] = useState([]);
    const [wallet, setWallet] = useState('');
    const [amount, setAmount] = useState();
    const [note, setNote] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const selectCategoryState=useSelector(state=>state.selectCategory)
    const selectWalletState=useSelector(state=>state.selectWallet)

    useEffect(() => {
        axios.get('transaction/category')
            .then(res => {
                setListCategory(res.data.data)
            })
    }, [])

    useEffect(() => {
        axios.get('wallet/render')
            .then(res => {
                setListWallet(res.data.data)
            })
    }, [])

    const handleSelectCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleSelectWallet = (e) => {
        setWallet(e.target.value)
    }

    const handleChangeAmount = (e) => {
        setAmount(e.target.value)
    }

    const handleChangeNote = (e) => {
        setNote(e.target.value)
    }

    const handleChangeDate = (e) => {
        setDate(e.target.value)
    }

    const handleSaveTransaction = () => {
        const transaction = {
            wallet: selectWalletState.value,
            amount: amount*1,
            category: selectCategoryState.value.name,
            date: date,
            note: note
        }
        console.log('req',transaction)
        axios.post('transaction/add', transaction)
            .then((res) => {
                console.log(res.data.data)
                console.log('add thanh cong')
                dispatch(closeDialogTransaction())
            })
            .catch(() => {
                console.log('add that bai')
            })
    }

    return (
        <div className="">
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-[5px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h4 className="text-2xl font-semibold">
                                Add transaction
                            </h4>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => dispatch(closeDialogTransaction())}
                            >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="grid grid-cols-3 gap-1 p-2">

                            <div className=" w-full ">
                                <button id="button" onClick={() => dispatch(openDialogSelectWallet())}
                                        className="w-full col-span-2 flex relative  border border-gray-300 p-2 h-[60px]  rounded-[10px] hover:border-black">
                                    <div className="">

                                    <img data-v-6bc9d4d3=""
                                         src="https://static.moneylover.me/img/icon/icon.png" alt=""
                                         name="2" className="transaction-icon w-[24px] my-3 mx-4"/>
                                    </div>
                                    <span
                                        className="my-3 mx-4 absolute pl-12"
                                    >{selectWalletState.value}
                                    </span>
                                    <label htmlFor="button"
                                           className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >Select Wallet
                                    </label>
                                    {/*<svg xmlns="http://www.w3.org/2000/svg"*/}
                                    {/*     className="h-6 w-6 mx-[48px] my-3 pl-12 text-[#757575] hover:text-black "*/}
                                    {/*     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">*/}
                                    {/*    <path strokeLinecap="round" strokeLinejoin="round"*/}
                                    {/*          d="M9 5l7 7-7 7"></path>*/}
                                    {/*</svg>*/}
                                </button>

                            </div>

                            <div className=" w-full">
                                <button id="button" onClick={() => dispatch(openDialogCategory())}
                                        className="w-full col-span-2 flex relative  border border-gray-300 p-2 h-[60px]  rounded-[10px] hover:border-black">
                                    <img data-v-6bc9d4d3=""
                                         src={selectCategoryState.value.icon} alt=""
                                         name="2" className="transaction-icon w-[24px] my-3 mx-4"/>
                                    <span
                                        className="my-3 text-s pl-14 absolute"
                                    >{selectCategoryState.value.name ? selectCategoryState.value.name : 'Category'}
                                    </span>
                                    <label htmlFor="button"
                                           className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >Select Category
                                    </label>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-6 w-6 mx-[48px] my-3 text-[#757575] hover:text-black "
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">

                                    </svg>
                                </button>
                            </div>

                            <div className="relative w-full ">
                                <input type="number" id="floating_filled" onChange={handleChangeAmount} value={amount}
                                       className="block rounded-[10px] p-2 pt-5 w-full h-full text-sm text-gray-900 bg-gray-50  border border-gray-300  appearance-none dark:text-black  focus:outline-none focus:ring-0 hover:border-black peer"
                                       placeholder=" "/>
                                <label htmlFor="floating_filled"
                                       className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >Amount
                                </label>
                            </div>

                        </div>
                        <div className="grid grid-cols-3 gap-1 p-3 pt-0">
                            <div className="w-full">
                                <input type="datetime-local" value={date} onChange={handleChangeDate}
                                       className="block p-4 pl-10 h-full w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder=""/>
                            </div>
                            <div className="relative w-full col-span-2">
                                <input type="text" id="floating_filled" onChange={handleChangeNote} value={note}
                                       className="block rounded-[10px] p-2 pt-5 w-full h-full text-sm text-gray-900 bg-gray-50  border border-gray-300  appearance-none dark:text-black  focus:outline-none focus:ring-0 hover:border-black peer"
                                       placeholder=" "/>
                                <label htmlFor="floating_filled"
                                       className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >Note
                                </label>
                            </div>
                        </div>
                        {/*{iconsState && <DialogIcons/>}*/}
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => dispatch(closeDialogTransaction())}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleSaveTransaction}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"/>
        </div>
    );
};

export default DialogTransaction;