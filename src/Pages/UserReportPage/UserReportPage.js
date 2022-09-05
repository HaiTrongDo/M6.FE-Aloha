import React, {useCallback, useEffect, useState} from "react";
import './UserReportPage.css'
import ReportLayout from "../../Components/Layouts/Report/ReportLayout";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";
import TransactionBarChart from "../../Components/Layouts/Report/TransactionBarChart";
import PieChartInReport from "../../Components/Layouts/Report/PieChartInReport";
import {isLoadingAPIScreen, afterLoadingAPIScreen} from '../../Features/isLoadingScreen/isLoadingScreen'
import {useDispatch, useSelector} from "react-redux";
import {
    DEFAULT_DATA,
    // transactionData,
    dataPieChartExpense, dataPieChartIncome
} from './dummyData'


const UserReportPage = () => {
    const dispatch = useDispatch()
    const searchResult = useSelector(state => state.SearchInput.searchResult)
    const transactionData = searchResult.map((trans, index) => ({
        XAxis: new Date(trans?.date).toLocaleDateString(),
        Income: trans?.category?.type === "INCOME" ? trans?.amount : 0,
        Expense: trans?.category?.type === "EXPENSE" ? trans?.amount : 0,
        amt: 2400
    }))

    // const dataPieChartExpense = []
    // const dataPieChartIncome = []

    searchResult.forEach(trans => {
        if (trans.category.type === "INCOME") {
            if (dataPieChartExpense.includes(trans.category.name)) {

            }
        }
    })


    // const arrayUniqueByKey = [...new Map(searchResult.map(item =>
    //     [item.category.name, item.category.type]))];


    useEffect(() => {
        dispatch(isLoadingAPIScreen())
        console.log(searchResult);

        // console.log(arrayUniqueByKey);
        dispatch(afterLoadingAPIScreen())
    }, [searchResult])


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