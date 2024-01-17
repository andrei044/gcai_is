import { Avatar, Box, Link, createTheme, useTheme ,Menu,MenuItem} from "@mui/material";
import { tokens } from "../../theme";
// import {  Sidebar,Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import React from "react";
import { Navigate, useNavigate,useLocation } from "react-router-dom";
import { MY_TOKEN } from "../../constants";

// const MySidebar=(props:{hidden:boolean})=>{
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);

//     return (
//         <>
//             {!props.hidden && <Box
//       sx={{
//         "& .pro-sidebar-inner": {
//           background: `${colors.primary[400]} !important`,
//         },
//         "& .pro-icon-wrapper": {
//           backgroundColor: "transparent !important",
//         },
//         "& .pro-inner-item": {
//           padding: "5px 35px 5px 20px !important",
//         },
//         "& .pro-inner-item:hover": {
//           color: "#868dfb !important",
//         },
//         // "& .pro-menu-item.active": {
//         //   color: "#6870fa !important",
//         // }, position: "fixed", left: 0,
//         // width:"fit-content"
//       }}
//     >
//             <Sidebar collapsed={true}
//             rootStyles={{
//                 [`.${sidebarClasses.container}`]: {
//                     backgroundColor: colors.purpleAccent[500],
//                     borderRadius: 10,
//                     width:"fit-content",
//                     height:"90vh",
//                     marginLeft:10,
//                     // paddingBottom:100
//                 },
//                 borderColor:"#7a5af500",
//                 // width:"fit-content"
                
                
//             }}>
//             <Menu style={{height:"90vh", display:"flex",flexDirection:"column",justifyContent:"space-between"}}
            
//             >
//                 <MenuItem 
//                 style={{marginTop:"5vh"}}
//                 > <HomeOutlinedIcon></HomeOutlinedIcon> </MenuItem>
//                 <MenuItem 
//                 style={{marginTop:"5vh"}}
//                 > <ChatBubbleOutlineOutlinedIcon></ChatBubbleOutlineOutlinedIcon> </MenuItem>
//                 <MenuItem 
//                 style={{marginTop:"5vh"}}
//                 > <AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon> </MenuItem>
//                 <MenuItem 
//                 style={{marginTop:"5vh"}}
//                 > <SettingsOutlinedIcon></SettingsOutlinedIcon> </MenuItem>
//                 <MenuItem 
//                 style={{marginTop:"40vh", marginBottom:20}}
//                 > <Avatar></Avatar> </MenuItem>
//             </Menu>
//             </Sidebar>
//             </Box>}
//         </>
//     );
// }

const MySidebar=(props:{hidden:boolean})=>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    // localStorage.removeItem(MY_TOKEN);
    navigate("/login");
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname)
  return (
      <>
          {!((location.pathname=="/login") || (location.pathname=="/signup")) && 
          <Box
          sx={{display:"flex", flexDirection:"column",justifyContent:"space-between", backgroundColor:colors.purpleAccent[500], borderRadius:5}}
          >
            <Box
            sx={{
              display:"flex",flexDirection:"column",justifyContent:"space-evenly",
              height:"100%", alignSelf:"center", width:"100%"
            }}
            >
            <Link href="/chats"><HomeOutlinedIcon sx={{alignSelf:"center", ":hover":{backgroundColor:colors.bgk[500]},borderRadius:3,width:"50%"}}></HomeOutlinedIcon></Link>
            <Link href="/chats"><ChatBubbleOutlineOutlinedIcon sx={{alignSelf:"center", ":hover":{backgroundColor:colors.bgk[500]},borderRadius:3,width:"50%"}}></ChatBubbleOutlineOutlinedIcon></Link>
            <Link href="/create"><AddCircleOutlineOutlinedIcon sx={{alignSelf:"center", ":hover":{backgroundColor:colors.bgk[500]},borderRadius:3,width:"50%"}}></AddCircleOutlineOutlinedIcon></Link>
            <SettingsOutlinedIcon sx={{alignSelf:"center", ":hover":{backgroundColor:colors.bgk[500]},borderRadius:3,width:"50%",color:colors.bgk[500]}}></SettingsOutlinedIcon>
            </Box>
            <Box>
            
              <div onClick={handleClick}>
                <Avatar sx={{alignSelf:"center", margin:2, ":hover":{backgroundColor:colors.bgk[500]},color:colors.grey[100]}}></Avatar>
              </div>
              <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Box>
          
          </Box>}
      </>
  );
}

export default MySidebar