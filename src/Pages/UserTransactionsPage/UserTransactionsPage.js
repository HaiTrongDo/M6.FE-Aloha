import React, {useEffect, useState} from 'react'
import TransactionsLayout from "../../Components/Layouts/Transactions/TransactionsLayout";
import {useDispatch, useSelector} from "react-redux";
import DialogTransaction from "../../Components/Dialog/DialogTransaction";
import DialogTransactionCategory from "../../Components/Dialog/DialogTransactionCategory";
import DialogSelectWallet from "../../Components/Dialog/DialogSelectWallet";
import {closeDialogSelectWallet} from "../../Features/DiaLogSlice/openDialogWallet";
import Button from '@mui/material/Button';
import axios from "../../axios";
import DialogEditTransaction from "../../Components/Dialog/DialogEditTransaction";
import {openDialogEditTransaction} from "../../Features/DiaLogSlice/openEditTransactionSlice";
import {selectTransaction} from "../../Features/DiaLogSlice/transactionSlice";
import {openDialogTransaction} from "../../Features/DiaLogSlice/openDialogTransactionSlice";


const UserTransactionsPage = () => {
    const dispatch = useDispatch()
    const dialogTransactionState = useSelector(state => state.dialogTransaction.value);
    const dialogCategoryState = useSelector(state => state.DialogCategory.value)
    const dialogWalletState = useSelector(state => state.dialogWallet.value);
    const [toggleDetail, setToggleDetail] = useState(false)
    const [active] = useState("py-3 sm:py-4 hover:bg-emerald-50 hover:cursor-pointer")
    const [listTransaction, setListTransaction] = useState([])
    const user = JSON.parse(localStorage.getItem('alohaUser'))
    const [detail, setDetail] = useState({})
    const dialogEditState = useSelector(state => state.dialogEditTransaction.value)


    useEffect(() => {
        axios.post('transaction/list', {user: user._id})
            .then(res => {
                setListTransaction(res.data.data)
            })
    }, [])


    const handleCLoseDetail = () => {
        setToggleDetail(false)
    }
    const handleOpenDetail = () => {
        setToggleDetail(true)
    }
    const handleOpenEditTransaction = () => {
        dispatch(openDialogEditTransaction());
        dispatch(selectTransaction(detail))
    }

    return (<div>
            <TransactionsLayout>
                {dialogTransactionState && <DialogTransaction/>}
                {dialogEditState && <DialogEditTransaction/>}
                {dialogCategoryState && <DialogTransactionCategory/>}
                {dialogWalletState && <DialogSelectWallet/>}

                <div className="flex justify-center gap-2">
                    <div className=" bg-white master-container shadow-md flex-cols w-1/3 h-1/3 rounded rounded-lg pt-2">
                        <div className='pb-5'>
                            <div
                                className="containHeader bg-white flex flex-grow w-full justify-center gap-10 m-auto p-2">
                                <span className="cursor-pointer">LAST MONTH</span>
                                <span className="cursor-pointer">THIS MONTH</span>
                                <span className="cursor-pointer">FUTURE</span>
                            </div>
                            <hr/>
                            <div className="report block bg-white">
                                <div className=" flex justify-between p-3">
                                    <div>Inflow</div>
                                    <div>$0</div>
                                </div>
                                <div className=" flex justify-between px-3 py-1">
                                    <div>Outflow</div>
                                    <div>-$1,200.00</div>
                                </div>
                                <div className=" flex justify-between px-3 py-1">
                                    <span> </span>
                                    <span className="border-t-2">-$1,200.00</span>
                                </div>
                                <div className=" flex text-[#2db84c] font-medium cursor-pointer">
                                    <div className="w-full flex justify-center my-3">VIEW REPORT FOR THIS PERIOD</div>
                                </div>
                            </div>
                        </div>
                        <div
                            className=" w-full bg-white border sm:p-8 ">
                            <div className="flow-root w-full ">
                                <ul role="list" className="divide-y divide-gray-200 ">

                                    {listTransaction.map((transaction, index) => (<div key={index}>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full"
                                                             src={transaction.category.icon ? transaction.category.icon : "https://static.moneylover.me/img/icon/icon_136.png"}
                                                             alt="Neil image"/>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate ">
                                                            {transaction.category.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate ">
                                                            2 Transactions
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="inline-flex items-center text-base  text-gray-900 ">
                                                        {transaction.category.type === 'EXPENSE' ? "-" + transaction.amount : "+" + transaction.amount}
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={!toggleDetail ? active : (detail._id === transaction._id ? active + " " + "bg-emerald-50" : active)}
                                                onClick={() => {
                                                    setDetail(transaction);
                                                    handleOpenDetail()
                                                }}>
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="text-2xl"
                                                        >25
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-gray-500 truncate ">
                                                            {transaction.date}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={transaction.category.type === 'EXPENSE' ? 'inline-flex items-center text-base text-red-600' : 'inline-flex items-center text-base text-blue-600 '}
                                                    >
                                                        {transaction.category.type === 'EXPENSE' ? "-" + transaction.amount : "+" + transaction.amount}
                                                    </div>
                                                </div>
                                            </li>
                                        </div>))}
                                </ul>
                            </div>
                        </div>
                    </div>


                    {/*detail transaction*/}
                    {toggleDetail && <div className=" master-container flex h-[280px] w-[60%] rounded-5">
                        <div className="bg-white w-full ">
                            <div className="flex justify-between items-start p-5 border-0 rounded-t border-b-2">
                                <div className="inline flex ml-4">
                                    <button className="pt-1 text-[#757575] my-auto"
                                            onClick={handleCLoseDetail}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                    <div className="pl-[15px] text-[20px] h-6 font-sans ml-2 font-semibold">
                                        Transaction Details
                                    </div>
                                </div>
                                <div className="">
                                    <Button sx={{color: 'red'}}>DELETE</Button>
                                    <Button sx={{color: '#2EB74B'}} onClick={handleOpenEditTransaction}
                                    >EDIT
                                    </Button>
                                </div>
                            </div>


                            <div>
                                <div className="grid grid-cols-6 mt-3">
                                    <div className="">
                                        <img
                                            src={detail.category.icon
                                                ? detail.category.icon
                                                : "https://static.moneylover.me/img/icon/ic_category_foodndrink.png"}
                                            alt=""
                                            className="w-[60px] ml-14"/>
                                    </div>
                                    <div className="col-span-5">
                                        <div className="text-3xl">{detail.category.name}</div>
                                        <div className="mt-1 ">Ăn uống</div>
                                        <div className="mt-1 text-gray-500">{detail.date}</div>
                                        <hr className="mt-2 w-[200px]"/>
                                    </div>
                                </div>

                                <div className="grid grid-cols-6">
                                    <div></div>
                                    <div
                                        className={detail.category.type === 'EXPENSE' ? 'text-3xl text-red-600 mt-4 col-span-5' : 'text-3xl text-blue-600 mt-4 col-span-5'}
                                    >
                                        {detail.category.type === 'EXPENSE' ? '-' + detail.amount : '+' + detail.amount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                </div>

            </TransactionsLayout>
        </div>);
};

export default UserTransactionsPage;