import React, {useCallback, useEffect, useState} from "react";
import './UserReportPage.css'
import ReportLayout from "../../Components/Layouts/Report/ReportLayout";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";
import TransactionBarChart from "../../Components/Layouts/Report/TransactionBarChart";
import PieChartInReport from "../../Components/Layouts/Report/PieChartInReport";
import {isLoadingAPIScreen, afterLoadingAPIScreen} from '../../Features/isLoadingScreen/isLoadingScreen'
import {useDispatch} from "react-redux";
//do not change this below data
const DEFAULT_DATA = [
    {name: "None", value: 0.001, type: "EXPENSES"}
];
//do not change this above data


const transactionData = [
    {
        XAxis: "2/5",
        Income: 4000,
        Expense: 2400,
        amt: 2400
    },
    {
        XAxis: "5/5",
        Income: 3000,
        Expense: 1398,
        amt: 2210
    },
    {
        XAxis: "5/5",
        Income: 2000,
        Expense: 9800,
        amt: 2290
    },
    {
        XAxis: "5/5",
        Income: 2780,
        Expense: 3908,
        amt: 2000
    },
    {
        XAxis: "5/5",
        Income: 1890,
        Expense: 4800,
        amt: 2181
    },
    {
        XAxis: "5/5",
        Income: 2390,
        Expense: 3800,
        amt: 2500
    },
    {
        XAxis: "5/5",
        Income: 3490,
        Expense: 4300,
        amt: 2100
    },
];
const dataPieChartExpense = [
    {name: "Transportation", value: 400, type: "EXPENSES"},
    {name: "Group B", value: 300, type: "EXPENSES"},
    {name: "Group C", value: 300, type: "EXPENSES"},
    {name: "Group D", value: 100, type: "INCOME"}
];
const dataPieChartIncome = [
    {name: "Interest", value: 600, type: "EXPENSES"},
    {name: "Investment", value: 300, type: "EXPENSES"},
]


const UserReportPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(isLoadingAPIScreen())
        dispatch(afterLoadingAPIScreen())
    }, [])
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
                            <TransactionBarChart transactionData={transactionData}/>
                        </div>
                        <div className="flex inline justify-center w-full text-gray-600">
                            <div className="block w-1/2 ">
                                <span className="flex justify-center mt-[22px]">Income</span>
                                <span className="flex justify-center text-blue-500">$0</span>
                                <div className="w-full flex px-[15px] mb-[16px] text-sm">
                                    <PieChartInReport
                                        color={dataPieChartIncome.length > 0 && "#1d4ed8"}
                                        data={dataPieChartIncome.length ? dataPieChartIncome : DEFAULT_DATA}/>
                                </div>
                            </div>
                            <div className="block w-1/2 relative ">
                                <span className="flex justify-center mt-[22px]">Expenses</span>
                                <span className="flex justify-center text-red-600">-$ 1,212.00</span>
                                <div className="w-full flex px-[15px] mb-[16px] text-sm absolute">
                                    <PieChartInReport
                                        color={dataPieChartExpense.length > 0 && "#be123c"}
                                        data={dataPieChartExpense.length ? dataPieChartExpense : DEFAULT_DATA}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </ReportLayout>
        </motion.div>
    );
};

export default UserReportPage;