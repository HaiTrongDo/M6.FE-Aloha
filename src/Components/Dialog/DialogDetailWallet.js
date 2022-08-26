import {setIconObj} from "../../Features/SelectWallet/selectWallet";
import {useDispatch} from "react-redux";
import {closeDialogIcons} from "../../Features/DiaLogSlice/openDialogIconsSlice";
import {closeDialogDetail} from "../../Features/DiaLogSlice/openDialogDetailSlice";

export default function DialogDetailWallet() {
    const dispatch = useDispatch();

    const handleCloseDialogDetailWallet = () => {
        dispatch(closeDialogDetail(false))
    }

    return (
        <div className={" w-1/2 "}>
            <div className=" border mt-[100px] w-[90%]  text-xs text-gray-900 border ">
                <div
                    className={"text-left  flex justify-between py-4 px-6 py-2 border-b border-gray-200 w-full h-[63px]"}>
                    <div className={"flex"}>
                        <button onClick={handleCloseDialogDetailWallet}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className=" w-5 h-5 text-[#ccc] hover:text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15"/>
                            </svg>
                        </button>
                        <span className={"text-lg px-4 text-black "}>Wallet details</span>
                    </div>
                    <div className={"flex text-center text-base"}>
                        <button className={"text-[#2EB74B] w-[80px] h-[36px] mx-[20px] hover:bg-[#E9F6EB]"}>EDIT
                        </button>
                        <button className={"text-[#F15A59] w-[80px] h-[36px] hover:bg-[#FEECEB]"}>DELETE</button>
                    </div>
                </div>
                <div className={"w-full h-[102px]"}>
                    <div className={"p-[23px] pl-[77px] flex "}>
                        <img className={"w-[56px] h-[56px] rounded-full"}
                             src="https://static.moneylover.me/img/icon/icon_1.png" alt=""/>
                        <div className={"mx-[34px] font-sans"} >
                            <h2 className={"text-[24px] w-[123px] h-[32px] "}>name</h2>
                            <p className={"text-[14px]  font-normal"}>United States Dollar</p>
                        </div>
                    </div>
                </div>
                <div className={"w-full h-[113px]"}>

                </div>

            </div>
        </div>

    )
}