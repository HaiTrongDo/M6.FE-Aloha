import React, {useCallback, useEffect, useState} from "react";
import './UserReportPage.css'
import ReportLayout from "../../Components/Layouts/Report/ReportLayout";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";
import TransactionBarChart from "../../Components/Layouts/Report/TransactionBarChart";
import PieChartInReport from "../../Components/Layouts/Report/PieChartInReport";
import {isLoadingAPIScreen, afterLoadingAPIScreen} from '../../Features/isLoadingScreen/isLoadingScreen'
import {useDispatch, useSelector} from "react-redux";
import axios from '../../axios/index'
import {DEFAULT_DATA} from './dummyData'


const UserReportPage = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(store => store.currentUser.currentUser)
    const [transactionData, setTransactionData] = useState([])
    const [dataPieChartIncome, setDataPieChartIncome] = useState(DEFAULT_DATA)
    const [dataPieChartExpense, setDataPieChartExpense] = useState(DEFAULT_DATA)
    const totalIncome = dataPieChartIncome.reduce((partialSum, a) => partialSum + a.value, 0);
    const totalExpense = dataPieChartExpense.reduce((partialSum, a) => partialSum + a.value, 0);
    const endingBalance = Math.abs(totalIncome - totalExpense)
    const financialAnalyzes = (totalIncome / totalExpense).toFixed(2)
    useEffect(() => {
        dispatch(isLoadingAPIScreen())
        axios.post('transaction/search/get-report-data', {userId: currentUser?._id})
            .then(resultFromBEAloha => {
                console.log(resultFromBEAloha.data);
                resultFromBEAloha?.data?.transactionData && setTransactionData([...resultFromBEAloha.data.transactionData])
                resultFromBEAloha?.data?.dataPieChartIncome.length && setDataPieChartIncome([...resultFromBEAloha.data.dataPieChartIncome])
                resultFromBEAloha?.data?.dataPieChartExpense.length && setDataPieChartExpense([...resultFromBEAloha.data.dataPieChartExpense])
                dispatch(afterLoadingAPIScreen())
            })
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
                                <span
                                    style={{color: `${totalIncome > totalExpense ? "#1d4ed8" : "#be123c"}`}}> {totalIncome > totalExpense ? "" : "- "} $ {endingBalance}</span>
                            </div>
                        </div>
                        <hr/>
                        <div className="block justify-center w-full py-3">
                            <h1 className=" flex justify-center text-xl text-gray-500">Financial Analyzes</h1>
                            <h1 className="flex justify-center text-2xl"
                                style={{color: `${totalIncome > totalExpense ? "#1d4ed8" : "#be123c"}`}}> {financialAnalyzes}</h1>
                        </div>
                        <div className="flex justify-center w-full">
                            <TransactionBarChart transactionData={transactionData}/>
                        </div>
                        <div className="flex inline justify-center w-full text-gray-600">
                            <div className="block w-1/2 ">
                                <span className="flex justify-center mt-[22px]">Income</span>
                                <span
                                    className="flex justify-center text-blue-500">${totalIncome.toFixed(2)}</span>
                                <div className="w-full flex px-[15px] mb-[16px] text-sm">
                                    <PieChartInReport
                                        color={dataPieChartIncome[0]?.name !== "None" ? "#1d4ed8" : "#71717a"}
                                        data={dataPieChartIncome}/>
                                </div>
                            </div>
                            <div className="block w-1/2 relative ">
                                <span className="flex justify-center mt-[22px]">Expenses</span>
                                <span
                                    className="flex justify-center text-red-600">-$ {totalExpense.toFixed(2)}</span>
                                <div className="w-full flex px-[15px] mb-[16px] text-sm absolute">
                                    <PieChartInReport
                                        color={dataPieChartExpense[0].name !== "None" ? "#be123c" : "#71717a"}
                                        data={dataPieChartExpense}/>
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