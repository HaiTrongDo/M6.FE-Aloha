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
                    <div className="master-container flex-cols w-1/3 h-1/3 rounded">
                        <div className="flex flex-auto w-full ">
                            <h1>LAST MONTH</h1>
                            <h1>THIS MONTH</h1>
                            <h1>FUTURE</h1>
                        </div>

                    </div>
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