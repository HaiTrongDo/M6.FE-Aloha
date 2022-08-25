import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeDialogCategory} from "../../Features/DiaLogSlice/openDialogCategorySlice";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import axios from '../../axios'
import {selectCategory} from "../../Features/DiaLogSlice/categorySlice";


const DialogTransactionCategory = (props) => {
    const dispatch = useDispatch();
    const selectCategoryState = useSelector(state => state.selectCategory)
    const [listCategory, setListCategory] = useState([]);
    const [listExpense, setListExpense] = useState([]);
    const [listIncome, setListIncome] = useState([]);
    const [typeCategory, setTypeCategory] = useState(true)

    const handleCloseCategory = () => {
        dispatch(closeDialogCategory())
    }

    useEffect(() => {
        axios.get('transaction/category')
            .then(res => {
                setListCategory(res.data.data)
            })
    }, [])

    useEffect(() => {
        axios.get('transaction/category/expense')
            .then(res => {
                setListExpense(res.data.data)
            })
    }, [])

    useEffect(() => {
        axios.get('transaction/category/income')
            .then(res => {
                setListIncome(res.data.data)
            })
    }, [])

    const handleTypeCategory = () => {
        setTypeCategory(!typeCategory)
    }

    return (
        <div className="bg-white border-gray-800">
            <div
                className="justify-center  items-center flex overflow-x-hidden modal-dialog modal-dialog-scrollable fixed inset-0 z-50 outline-none focus:outline-none"
                tabIndex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-[5px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start p-5 border-0 rounded-t">
                            <button className="pt-1 text-[#757575]" onClick={handleCloseCategory}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <span className="pl-[15px] text-[20px] font-sans">
                                Select Category
                            </span>
                        </div>
                        <div className="grid grid-cols-5 flex flex-col justify-center items-center border-0">
                            <div></div>

                            <input
                                className="rounded-t col-span-3  appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none "
                                id="grid-last-name" type="text" placeholder="Search"/>
                        </div>
                        <div
                            className="grid grid-cols-4 flex flex-col justify-center items-center border-gray-300 pt-2">
                            <div></div>
                            {typeCategory ? <Button variant="outlined">EXPENSE</Button> :
                                <Button onClick={handleTypeCategory}>EXPENSE</Button>}
                            {!typeCategory ? <Button variant="outlined">INCOME</Button> :
                                <Button onClick={handleTypeCategory}>INCOME</Button>}
                            <div></div>
                        </div>
                        {/*body*/}
                        <div className="modal-body relative w-[500px] h-[490px] border-t-2 flex-auto p-4">
                            <ul className='m-auto p-4'>
                                {typeCategory
                                    ? listExpense.map((value, index) => {
                                        return (
                                            <div key={index} className="relative pl-8 pr-8 border-b-2 hover:cursor-pointer">
                                                <li className='m-auto grid grid-cols-2' onClick={() => {
                                                    dispatch(selectCategory(value.name))
                                                    dispatch(closeDialogCategory())
                                                }}>
                                                    <img data-v-61e80534=""
                                                         src={value.icon} alt=""
                                                         name="2" className="category-icon w-[50px]"/>
                                                    {value.name}
                                                </li>
                                            </div>
                                        )
                                    })
                                    : listIncome.map((value, index) => {
                                        return (
                                            <div key={index} className="relative pl-8 pr-8 border-b-2 hover:cursor-pointer">
                                                <li className='m-auto grid grid-cols-2' onClick={() => {
                                                    dispatch(selectCategory(value.name))
                                                    dispatch(closeDialogCategory())
                                                }}>
                                                    <img data-v-61e80534=""
                                                         src={value.icon} alt=""
                                                         name="2" className="category-icon w-[50px]"/>
                                                    {value.name}
                                                </li>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DialogTransactionCategory;