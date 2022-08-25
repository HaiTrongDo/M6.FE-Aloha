import TransactionsLayout from "../../Components/Layouts/Transactions/TransactionsLayout";
import { useSelector} from "react-redux";
import DialogTransaction from "../../Components/Dialog/DialogTransaction";
import DialogCategory from "../../Components/Dialog/DialogCategory";



const UserTransactionsPage = () => {
    const transactionState=useSelector(state => state.dialogTransaction.value);
    const dialogCategoryState=useSelector(state => state.DialogCategory)

    return (
        <div>
            <TransactionsLayout>
                {transactionState && <DialogTransaction/>}
                {transactionState && dialogCategoryState && <DialogCategory/>}
            </TransactionsLayout>
        </div>
    );
};

export default UserTransactionsPage;