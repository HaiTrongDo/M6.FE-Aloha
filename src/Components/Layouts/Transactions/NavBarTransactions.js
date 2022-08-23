import NavBar from "../../NavBar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import {useDispatch} from "react-redux";
import {openDialogTransaction} from "../../../Features/DiaLogSlice/openDialogTransactionSlice";

const NavBarTransactions = () => {
    const dispatch=useDispatch()
    return (
        <div>
            <NavBar>
                <IconButton >
                    <CalendarMonthIcon/>
                </IconButton>

                <IconButton>
                    <RemoveRedEyeIcon/>
                </IconButton>

                <IconButton>
                    <SearchIcon/>
                </IconButton>
                <Button color="success" variant="contained"
                onClick={()=>dispatch(openDialogTransaction(true))}
                >ADD TRANSACTION</Button>
            </NavBar>
        </div>
    );
};

export default NavBarTransactions;