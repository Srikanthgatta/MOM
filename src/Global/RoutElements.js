import DashboardIcon from "@mui/icons-material/Dashboard";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import LogoutIcon from "@mui/icons-material/Logout";
import BroadcastOnHomeIcon from '@mui/icons-material/BroadcastOnHome';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';



export const routes = [
    {
        title : "Dashboard",
        href : "/dashboard",
        icon : <DashboardIcon/>,
    },
    {
        title : "Users Managment",
        href : "/users",
        icon : <PeopleIcon/>,
    },
    {
        title : "Department",
        href : "/department",
        icon : <BroadcastOnHomeIcon/>,
    },
    {
        title : "Organize Meeting",
        href : "/meeting",
        icon : <MeetingRoomIcon/>,
    },
]