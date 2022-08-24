import TransactionsLayout from "../../Components/Layouts/Transactions/TransactionsLayout";

const MyAccountPage = () => {
    return (
        <div>
            <TransactionsLayout>
                <div className='flex text-3xl underline p-2'>
                <h1 >this is the Account  </h1>
                </div>
            </TransactionsLayout>
        </div>
    );
};

export default MyAccountPage;