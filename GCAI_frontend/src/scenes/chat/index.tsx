import { Box, Button,Link,Typography,useTheme } from "@mui/material"
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ConversationSearch from "../../components/ConversationSearch";
import BotTitle from "../../components/BotTitle";
import MessagesTab from "../../components/MessagesTab";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { API_BASE_URL, MY_TOKEN } from "../../constants";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setBot } from "../../features/selected/selectedSlice";
import { Chatbot, User } from "../../types/types";
import { setCurrentUser } from "../../features/currentUser/currentUserSlice";
import { api } from "../../utils/utils";
import { useEffect } from "react";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Chatbot Generator
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
    }

const MyChat=()=>{
    const [searchParams] = useSearchParams();

    const selectedBot = useAppSelector((state:any) => state.selected.value)
    const currentUser = useAppSelector((state:any) => state.currentUser.value)
    const dispatch = useAppDispatch()
    const navigator=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem(MY_TOKEN)==null){
            let myToken=searchParams.get("token");
            if(myToken){
                localStorage.setItem(MY_TOKEN, myToken)
                api<User>(API_BASE_URL+"/profile").then((val)=>{
                    let user=val as User
                    dispatch(setCurrentUser(user))
                })
                
            }else{
                navigator("/login")
            }
            
        }else{
            api<User>(API_BASE_URL+"/profile").then((val)=>{
                let user=val as User
                dispatch(setCurrentUser(user))
            })
        }
    },[])
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <>
            {/* <Box sx={{marginLeft:5, width:"100vh"}}> */}
            {/* HEADER */}
                {/* <Box display="flex" justifyContent="space-between" alignItems="center"> */}
                    {/* <Header title="CHATS" subtitle="Welcome to your chats" /> */}

                    {/* <Box>
                    <Button
                        sx={{
                        backgroundColor: colors.purpleAccent[500],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                    </Box> */}
                {/* </Box>
            </Box> */}
            <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="158px"
                    gap="20px"
            >
                <Box
                    sx={{backgroundColor:colors.grey[500], borderRadius:4}}
                    gridColumn="span 3"
                    gridRow="span 5"
                    // display="flex"
                    // alignItems="center"
                    // justifyContent="center"
                ><ConversationSearch></ConversationSearch></Box>
                <Box
                    sx={{backgroundColor:colors.grey[500], borderRadius:4}}
                    gridColumn="span 9"
                    gridRow="span 1"
                    // display="flex"
                    // alignItems="center"
                    // justifyContent="space-evenly"
                ><BotTitle botName={selectedBot.name} ></BotTitle></Box>
                <Box
                    sx={{backgroundColor:colors.grey[500], borderRadius:4}}
                    gridColumn="span 9"
                    gridRow="span 4"
                    // display="flex"
                    // alignItems="center"
                    // justifyContent="center"
                ><MessagesTab></MessagesTab></Box>
            </Box>
            <Copyright sx={{ mt: 2}} />
        </>
    );
}

export default MyChat;