import NavBar from "../NavBar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const NavBarReport = () => {
    return (
        <div>
            <NavBar>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
            </NavBar>
        </div>
    );
};

export default NavBarReport;