import React from 'react';
import SearchPageLayout from "../../Components/Layouts/Search/SearchPageLayout";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";


const UserSearchTransactionPage = () => {
    return (
        <motion.div  initial="exit"
                     animate="enter"
                     exit="exit"
                     variants={Variants.variant1}>
            <SearchPageLayout>
            <h1>Search Page</h1>
            </SearchPageLayout>
        </motion.div>
    );
};

export default UserSearchTransactionPage;