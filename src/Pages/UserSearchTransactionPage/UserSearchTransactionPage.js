import React from 'react';
import SearchPageLayout from "../../Components/Layouts/Search/SearchPageLayout";
import DialogTransactionCategory from "../../Components/Dialog/DialogTransactionCategory";
import DialogSelectWallet from "../../Components/Dialog/DialogSelectWallet";
import {useSelector} from "react-redux";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";


const UserSearchTransactionPage = () => {
    const dialogCategoryState = useSelector(state => state.DialogCategory.value)
    const dialogWalletState = useSelector(state => state.dialogWallet.value);
    return (

        <div>
            <motion.div initial="exit"
                        animate="enter"
                        exit="exit"
                        variants={Variants.variant1}>
                {dialogCategoryState && <DialogTransactionCategory/>}
                {dialogWalletState && <DialogSelectWallet/>}
                <SearchPageLayout>
                    <div className="mt-[150px] flex justify-center ">

                        <div className="bg-white w-1/2 shadow-md rounded">sadas</div>

                    </div>
                </SearchPageLayout>
            </motion.div>
        </div>
    );
};


export default UserSearchTransactionPage;