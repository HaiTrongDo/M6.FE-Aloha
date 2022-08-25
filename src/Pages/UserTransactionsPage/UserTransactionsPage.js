import TransactionsLayout from "../../Components/Layouts/Transactions/TransactionsLayout";
import {useSelector} from "react-redux";
import DialogTransaction from "../../Components/Dialog/DialogTransaction";
import DialogTransactionCategory from "../../Components/Dialog/DialogTransactionCategory";
import DialogSelectWallet from "../../Components/Dialog/DialogSelectWallet";


const UserTransactionsPage = () => {
    const transactionState = useSelector(state => state.dialogTransaction.value);
    const dialogCategoryState = useSelector(state => state.DialogCategory.value);
    const dialogWalletState=useSelector(state => state.dialogWallet.value)


    return (
        <div>
            <TransactionsLayout >
                {transactionState && <DialogTransaction />}
                {dialogCategoryState && <DialogTransactionCategory />}
                {dialogWalletState && <DialogSelectWallet/>}
            </TransactionsLayout>
        </div>
    );
};

export default UserTransactionsPage;