
import './UserReportPage.css'
import ReportLayout from "../../Components/Layouts/Report/ReportLayout";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const transactionData = [
    {
        name: "Page A",
        Income: 4000,
        Expense: 2400,
        amt: 2400
    },
    {
        name: "Page B",
        Income: 3000,
        Expense: 1398,
        amt: 2210
    },
    {
        name: "Page C",
        Income: 2000,
        Expense: 9800,
        amt: 2290
    },
    {
        name: "Page D",
        Income: 2780,
        Expense: 3908,
        amt: 2000
    },
    {
        name: "Page E",
        Income: 1890,
        Expense: 4800,
        amt: 2181
    },
    {
        name: "Page F",
        Income: 2390,
        Expense: 3800,
        amt: 2500
    },
    {
        name: "Page G",
        Income: 3490,
        Expense: 4300,
        amt: 2100
    }
];

const UserReportPage = () => {


    return (
        <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={Variants.variant1}>
            <ReportLayout>
                <div className="flex justify-center p-[30px] text-center">
                    <div
                        className=" w-[21cm] bg-white shadow-md flex-block justify-center min-h-[29.7cm] {/*p-[2cm]*/}">
                        <div className="flex justify-center gap-5 my-5">
                            <div className="w-1/3 justify-center text-center text-gray-500">
                                <h1 className="text-xl">Opening Balance</h1>
                                <span>$ 0</span>
                            </div>
                            <div className="w-1/3 justify-center text-center text-gray-500">
                                <h1 className="text-xl">Ending Balance</h1>
                                <span>-$ 1,212.00</span>
                            </div>
                        </div>
                        <hr/>
                        <div className="block justify-center w-full py-3">
                            <h1 className=" flex justify-center text-xl text-gray-500">Financial Analyzes</h1>
                            <h1 className=" flex justify-center text-2xl">-$ 1,212.00</h1>
                        </div>
                        <div className="flex justify-center w-full">
                            <BarChart
                                width={700}
                                height={400}
                                data={transactionData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="Expense" fill="#8884d8"/>
                                <Bar dataKey="Income" fill="#82ca9d"/>
                            </BarChart>
                        </div>
                        <div className="flex inline justify-center w-full">
                            <div className="flex w-1/2 text-sm"></div>
                        </div>
                    </div>
                </div>
            </ReportLayout>
        </motion.div>
    );
};

export default UserReportPage;