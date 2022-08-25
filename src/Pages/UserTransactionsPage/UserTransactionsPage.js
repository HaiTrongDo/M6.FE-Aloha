import TransactionsLayout from "../../Components/Layouts/Transactions/TransactionsLayout";
import {useSelector} from "react-redux";
import DialogTransaction from "../../Components/Dialog/DialogTransaction";


const UserTransactionsPage = () => {
    const transactionState = useSelector(state => state.dialogTransaction.value)

    return (
        <div>
            <TransactionsLayout>
                {transactionState && <DialogTransaction/>}
                <div className="flex justify-center gap-2">
                    <div className="master-container flex-cols w-1/3 h-1/3 rounded">
                        <div className="flex flex-auto w-full ">
                            <h1>LAST MONTH</h1>
                            <h1>THIS MONTH</h1>
                            <h1>FUTURE</h1>
                        </div>

                    </div>
                    <div className=" master-container flex w-2/3 ">
                        <div>

                        </div>
                    </div>
                </div>

            </TransactionsLayout>
        </div>
    );
};

export default UserTransactionsPage;