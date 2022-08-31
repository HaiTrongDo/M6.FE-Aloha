import React, {useEffect, useState} from 'react';
import SearchPageLayout from "../../Components/Layouts/Search/SearchPageLayout";
import DialogTransactionCategory from "../../Components/Dialog/DialogTransactionCategory";
import DialogSelectWallet from "../../Components/Dialog/DialogSelectWallet";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";

import {useDispatch, useSelector} from "react-redux";
import {selectDetailTransaction} from "../../Features/Transaction/detailTransactionSlice";
import Button from "@mui/material/Button";
import axios from "../../axios";
import {selectCurrentWallet} from "../../Features/Transaction/currentWalletSlice";
import {UserLoginWithPassword} from "../../Features/CurrentUser/UserSlice";
import {openDialogEditTransaction} from "../../Features/DiaLogSlice/openEditTransactionSlice";
import swal from "sweetalert";

const UserSearchTransactionPage = () => {
    const dialogCategoryState = useSelector(state => state.DialogCategory.value)
    const dialogWalletState = useSelector(state => state.dialogWallet.value);
    const dispatch = useDispatch();
    const currentWalletState = useSelector(state => state.currentWallet.value)
    const dialogTransactionState = useSelector(state => state.dialogTransaction.value);
    const searchInput = useSelector(state => state.SearchInput.SearchInput);
    const [toggleDetail, setToggleDetail] = useState(false)
    const [active] = useState("py-3 sm:py-4 hover:bg-emerald-50 hover:cursor-pointer")
    const [listTransaction, setListTransaction] = useState([])
    const user = JSON.parse(localStorage.getItem('alohaUser'))
    const detailTransactionState = useSelector(state => state.selectDetailTransaction.value)
    const dialogEditState = useSelector(state => state.dialogEditTransaction.value);
    const [totalInflow, setTotalInflow] = useState()
    const [totalOutflow, setTotalOutflow] = useState()
    const [total, setTotal] = useState()
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();


    useEffect(() => {
        axios.post('transaction/search', {
            userId: user._id,
            wallet: searchInput.wallet,
            category: searchInput.category,
            date: searchInput.date,
            // startDate:new Date(searchInput.startDate.$d.toLocaleDateString('en-US')).getTime(),
            // endDate:new Date(searchInput.endDate.$d.toLocaleDateString('en-US')).getTime(),
            note: searchInput.note
        })
            .then(res => {
                // console.log(new Date(res.data.data[0].date).toLocaleDateString(), 'res')
                // console.log(new Date(searchInput.startDate).toLocaleDateString(), 'start')
                // console.log(new Date(searchInput.endDate).toLocaleDateString(), 'end')
                // console.log(searchInput.startDate, 'start')
                // console.log(searchInput.endDate, 'end')
                // console.log(new Date(res.data.data[0].date).getTime(), 'res')
                if (searchInput.startDate !=='' && searchInput.endDate!=='') {
                    const result = res.data.data.filter((item) => {
                        return (searchInput.startDate <= new Date(item?.date).getTime()
                            && searchInput.endDate >= new Date(item?.date).getTime())
                    })
                    let inflow = result.filter(value => {
                        return value.category.type === 'INCOME'
                    })
                    let sumInflow = 0
                    inflow?.forEach(value => sumInflow += value.amount)

                    let outFlow = result.filter(value => {
                        return value.category.type === 'EXPENSE'
                    })
                    let sumOutFlow = 0
                    outFlow?.forEach((value) => sumOutFlow += value.amount)

                    setTotalOutflow(sumOutFlow)
                    setTotalInflow(sumInflow)
                    setTotal(sumInflow - sumOutFlow)
                    setListTransaction(result)
                    setToggleDetail(false)
                } else {
                    let inflow = res?.data?.data?.filter(value => {
                        return value.category.type === 'INCOME'
                    })
                    let sumInflow = 0
                    inflow?.forEach(value => sumInflow += value.amount)

                    let outFlow = res?.data?.data?.filter(value => {
                        return value.category.type === 'EXPENSE'
                    })
                    let sumOutFlow = 0
                    outFlow?.forEach((value) => sumOutFlow += value.amount)

                    setTotalOutflow(sumOutFlow)
                    setTotalInflow(sumInflow)
                    setTotal(sumInflow - sumOutFlow)
                    setListTransaction(res.data.data)
                    setToggleDetail(false)
                }

            })


    }, [searchInput])

    useEffect(() => {
        axios.post('wallet/updateBalance', {walletId: currentWalletState?._id, initial: total})
            .then(res => {
                dispatch(selectCurrentWallet({...currentWalletState, initial: total}))
                axios.post('wallet/render', {userId: user._id})
                    .then(res => {
                        dispatch(UserLoginWithPassword({...user, wallet: res.data.data}))
                    })
            })
    }, [total])

    const handleCLoseDetail = () => {
        setToggleDetail(false)
    }
    const handleOpenDetail = () => {
        setToggleDetail(true)
    }
    const handleOpenEditTransaction = () => {
        dispatch(selectDetailTransaction(detailTransactionState))
        dispatch(openDialogEditTransaction());
    }
    const handleDeleteTransaction = () => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post('transaction/delete', {id: detailTransactionState?._id})
                        .then(() => {
                            axios.post('transaction/list', {user: user?._id})
                                .then(res => {
                                    let inflow = res.data.data.filter(value => {
                                        return value.category.type === 'INCOME'
                                    })
                                    let sumInflow = 0
                                    inflow.forEach(value => sumInflow += value.amount)

                                    let outFlow = res.data.data.filter(value => {
                                        return value.category.type === 'EXPENSE'
                                    })
                                    let sumOutFlow = 0
                                    outFlow.forEach((value) => sumOutFlow += value.amount)

                                    setTotalOutflow(sumOutFlow)
                                    setTotalInflow(sumInflow)
                                    setTotal(sumInflow - sumOutFlow)
                                    setListTransaction(res.data.data)
                                    setToggleDetail(false)
                                })
                        })
                    swal("Poof! Your record has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your record is safe!");
                }
            });

    }


    return (
        <div>
            <motion.div initial="exit"
                        animate="enter"
                        exit="exit"
                        variants={Variants.variant1}>
                {dialogCategoryState && <DialogTransactionCategory/>}
                {dialogWalletState && <DialogSelectWallet/>}
                <SearchPageLayout>
                    <div className="pt-24 mt-6 ">

                        <div className="flex justify-center gap-2">
                            <div
                                className=" bg-white master-container shadow-md flex-cols w-[40%] h-1/3 rounded rounded-lg pt-2">
                                <div className='pb-5'>
                                    <div className="report block bg-white">
                                        <div className=" flex justify-between p-3">
                                            <div>Inflow</div>
                                            <div className="text-blue-500">${totalInflow}</div>
                                        </div>
                                        <div className=" flex justify-between px-3 py-1">
                                            <div>Outflow</div>
                                            <div className="text-red-500">-${totalOutflow}</div>
                                        </div>
                                        <div className=" flex justify-between px-3 py-1">
                                            <span> </span>
                                            <span className='border-t-2'
                                            >{total}
                                </span>
                                        </div>
                                        <div className=" flex text-[#2db84c] font-medium cursor-pointer">
                                            <div className="w-full flex justify-center my-3">VIEW REPORT FOR THIS
                                                PERIOD
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className=" w-full bg-white border-t sm:p-8 ">
                                    <div className="flow-root w-full ">
                                        <ul role="list" className="divide-y divide-gray-200 ">

                                            {listTransaction?.map((transaction, index) => (<div key={index}>
                                                <li className="py-3 sm:py-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <img className="w-8 h-8 rounded-full"
                                                                 src={transaction?.category?.icon ? transaction?.category?.icon : "https://static.moneylover.me/img/icon/icon_136.png"}
                                                                 alt="Neil image"/>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                                {transaction.category.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500 truncate ">
                                                                1 Transactions
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="inline-flex items-center text-base  text-gray-900 ">
                                                            {transaction.category.type === 'EXPENSE' ? "-$" + transaction.amount : "+$" + transaction.amount}
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className={!toggleDetail ? active : (detailTransactionState?._id === transaction?._id ? active + " " + "bg-emerald-50" : active)}
                                                    onClick={() => {
                                                        dispatch(selectDetailTransaction(transaction));
                                                        handleOpenDetail()
                                                    }}>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="text-2xl"
                                                            >{new Date(transaction?.date).getDate()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm text-gray-500 truncate ">
                                                                {new Date(transaction?.date).toDateString()}
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={transaction?.category?.type === 'EXPENSE' ? 'inline-flex items-center text-base text-red-500' : 'inline-flex items-center text-base text-blue-500 '}
                                                        >
                                                            {transaction?.category?.type === 'EXPENSE' ? "-$" + transaction?.amount : "+$" + transaction?.amount}
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>))}
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            {/*detail transaction*/}
                            {toggleDetail && <div className=" master-container flex h-[280px] w-[50%] rounded-5">
                                <div className=" bg-white w-full ">
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
                                            <Button sx={{color: 'red'}}
                                                    onClick={handleDeleteTransaction}>DELETE</Button>
                                            <Button sx={{color: '#2EB74B'}} onClick={handleOpenEditTransaction}
                                            >EDIT
                                            </Button>
                                        </div>
                                    </div>


                                    <div>
                                        <div className="grid grid-cols-6 mt-3">
                                            <div className="">
                                                <img
                                                    src={detailTransactionState?.category?.icon
                                                        ? detailTransactionState?.category?.icon
                                                        : "https://static.moneylover.me/img/icon/ic_category_foodndrink.png"}
                                                    alt=""
                                                    className="w-[60px] ml-14"/>
                                            </div>
                                            <div className="col-span-5">
                                                <div className="text-3xl">{detailTransactionState?.category?.name}</div>
                                                <div className="mt-1 ">Ăn uống</div>
                                                <div
                                                    className="mt-1 text-gray-500">{new Date(detailTransactionState?.date).toDateString()}</div>
                                                <hr className="mt-2 w-[200px]"/>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-6">
                                            <div></div>
                                            <div
                                                className={detailTransactionState?.category?.type === 'EXPENSE' ? 'text-3xl text-red-600 mt-4 col-span-5' : 'text-3xl text-blue-600 mt-4 col-span-5'}
                                            >
                                                {detailTransactionState?.category?.type === 'EXPENSE' ? '-$' + detailTransactionState?.amount : '+$' + detailTransactionState?.amount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        </div>

                        {/*<div className="bg-white w-1/2 shadow-md rounded">sadas</div>*/}
                    </div>
                </SearchPageLayout>
            </motion.div>
        </div>
    );
};

export default UserSearchTransactionPage;