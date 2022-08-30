
import './UserReportPage.css'
import ReportLayout from "../../Components/Layouts/Report/ReportLayout";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";


const UserReportPage = () => {
    return (
        <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={Variants.variant1}>
            <ReportLayout>

            </ReportLayout>
        </motion.div>
    );
};

export default UserReportPage;