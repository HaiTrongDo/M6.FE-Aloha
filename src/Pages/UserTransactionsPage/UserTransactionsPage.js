import React from 'react'
import TransactionsLayout from "../../Components/Layouts/Transactions/TransactionsLayout";
import {useDispatch, useSelector} from "react-redux";
import DialogTransaction from "../../Components/Dialog/DialogTransaction";
import DialogTransactionCategory from "../../Components/Dialog/DialogTransactionCategory";
import DialogSelectWallet from "../../Components/Dialog/DialogSelectWallet";
import {closeDialogTransaction} from "../../Features/DiaLogSlice/openDialogTransactionSlice";
import {closeDialogSelectWallet} from "../../Features/DiaLogSlice/openDialogWallet";


const UserTransactionsPage = () => {
    const dispatch = useDispatch()
    const transactionState = useSelector(state => state.dialogTransaction.value);
    const dialogCategoryState = useSelector(state => state.DialogCategory.value)
    const dialogWalletState = useSelector(state => state.dialogWallet.value)

    return (
        <div>
            <TransactionsLayout>
                {transactionState && <DialogTransaction/>}
                {dialogCategoryState && <DialogTransactionCategory/>}
                {dialogWalletState && <DialogSelectWallet/>}

                <div className="flex justify-center gap-2">
                    <div className=" bg-white master-container shadow-md flex-cols w-1/3 h-1/3 rounded rounded-lg pt-2">
                        <div className='pb-5'>
                            <div className="containHeader bg-white flex flex-grow w-full justify-center gap-10 m-auto p-2">
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
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full"
                                                     src="https://static.moneylover.me/img/icon/icon_136.png" alt="Neil image"/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate ">
                                                    Transportation
                                                </p>
                                                <p className="text-sm text-gray-500 truncate ">
                                                    2 Transactions
                                                </p>
                                            </div>
                                            <div
                                                className="inline-flex items-center text-base  text-gray-900 ">
                                                -$ 212.00
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="text-2xl"
                                                     >25</div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate ">
                                                    Transportation
                                                </p>
                                                <p className="text-sm text-gray-500 truncate ">
                                                    2 Transactions
                                                </p>
                                            </div>
                                            <div
                                                className="inline-flex items-center text-base  text-gray-900 ">
                                                -$ 212.00
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>



                        {/*detail transaction*/}
                    <div className=" master-container flex w-[60%] rounded-5 ">
                        <div className="bg-white w-full h-[296px]">
                            <div>

                            </div>

                            <div>

                            </div>

                        </div>
                    </div>


                </div>

            </TransactionsLayout>
        </div>
    );
};

export default UserTransactionsPage;