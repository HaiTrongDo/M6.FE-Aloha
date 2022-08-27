import {useDispatch} from "react-redux";
import NavBar from "../../NavBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from "react";

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import category from "../../../Pages/Category/Category";
import { useNavigate} from "react-router-dom";


const NavBarWithMultipleInPut = () => {
    let navigate = useNavigate();

    // const dispatch=useDispatch()
    const [formDate, setFormData] = useState({
        wallet: 'Wallet',
        category:'Category',
        date:'',
        note:''
    });


    const handleOnChange = (event) => {
        console.log(event.target);
        setFormData({...formDate,[event.target.name]:event.target.value});
    };

    const handleReset = () => {
        setFormData({wallet: 'Wallet',
            category:'Category',
            date:'',
            note:''});
    };

    useEffect(() => {
        console.log(formDate);
    })
    return (
        <div>
            <NavBar>
                <div className="content-container block">
                    <div className="flex justify-between text-black w-full">
                        <div className=" p-4 flex text-black ">
                            <button className='w-10 h-10 cursor-pointer'><ArrowBackIcon onClick={()=>{navigate(-1)}}/></button>
                            <span className='w-50 h-10 p-1.5'> Search for transaction</span></div>
                        <div className=" flex text-sm  p-6 cursor-pointer" onClick={handleReset}>Reset</div>
                    </div>
                    <div className="flex  text-black">
                        <div className=" p-4 flex text-black gap-7 w-full justify-center">
                                <div className=" border-transparent border-2 hover:border-gray-200 rounded p-3">
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="walletSearch">
                                            Wallet
                                        </InputLabel>
                                        <Input
                                            name={"wallet"}
                                            onChange={()=>{}}
                                            id="walletSearch"
                                            value={formDate.wallet}
                                            defaultValue={"Total"}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <img className="h-7 object-cover"
                                                         src="https://static.moneylover.me/img/icon/ic_category_all.png"
                                                         alt=""/>
                                                </InputAdornment>
                                            }
                                            readOnly={true}
                                        />
                                    </FormControl>
                                </div>
                                <div className=" border-transparent border-2 hover:border-gray-200 rounded p-3">
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="walletSearch">
                                            Category
                                        </InputLabel>
                                        <Input
                                            name={"category"}
                                            onChange={()=>{}}
                                            id="walletSearch"
                                            value={formDate.category}
                                            defaultValue={"Category"}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <img className="h-7 object-cover"
                                                         src="https://static.moneylover.me/img/icon/ic_category_all.png"
                                                         alt=""/>
                                                </InputAdornment>
                                            }
                                            readOnly={true}
                                        />
                                    </FormControl>
                                </div>

                                <div className=" border-transparent border-2 hover:border-gray-200 rounded p-3">
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="walletSearch">
                                            Date
                                        </InputLabel>
                                        <Input
                                            name={"date"}
                                            onChange={()=>{}}
                                            id="walletSearch"
                                            value={formDate.date}
                                            defaultValue={new Date().toString()}
                                            readOnly={true}
                                        />
                                    </FormControl>
                                </div>

                                <div className=" border-transparent border-2 hover:border-gray-200 rounded p-3">
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="walletSearch">
                                            Note
                                        </InputLabel>
                                        <Input
                                            name={"note"}
                                            value={formDate.note}
                                            onChange={handleOnChange}
                                            id="walletSearch"
                                        />
                                    </FormControl>
                                </div>
                        </div>
                    </div>
                </div>
            </NavBar>
        </div>
    );
};

export default NavBarWithMultipleInPut