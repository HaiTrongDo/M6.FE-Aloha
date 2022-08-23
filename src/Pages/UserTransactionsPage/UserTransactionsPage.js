import TransactionsLayout from "../../Components/Layouts/Transactions/TransactionsLayout";
import {useSelector} from "react-redux";
import DialogTransaction from "../../Components/Dialog/DialogTransaction";


const UserTransactionsPage = () => {
    const transactionState=useSelector(state => state.dialogTransaction.value)

    return (
        <div>
            <TransactionsLayout>
                {transactionState && <DialogTransaction/>}
            </TransactionsLayout>
        </div>
    );
};

export default UserTransactionsPage;