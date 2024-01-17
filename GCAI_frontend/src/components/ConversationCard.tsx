import { Avatar, Box, Typography,useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { tokens } from "../theme";
import { Chatbot } from "../types/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setBot } from "../features/selected/selectedSlice";

const ConversationCard=(props:Chatbot)=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const selectedBot = useAppSelector((state:any) => state.selected.value)
    const dispatch = useAppDispatch()

    const colorSelected=()=>{
        console.log(props)
        if(props.id==selectedBot.id)
            return colors.purpleAccent[500]
        else{
            return colors.grey[400]
        }
            
    }

    const clickFunction=()=>{
        dispatch(setBot(props))
    }

    return (
        <>
        <div onClick={clickFunction}>
        <Box sx={{display:"flex",flexDirection:"row", backgroundColor:colorSelected,borderRadius:5, 
        // height:"10vh",
        // height:"wrap-content", 
        marginRight:2}}>
            <Box>
                <Avatar sx={{margin:2}}></Avatar>
            </Box>
            <Box sx={{display:"flex",flexDirection:"column", marginBottom:2, marginRight:2}}>
                <Typography alignSelf="start" component="h1" variant="h4" sx={{padding:2}}>{props.name}</Typography>
                <Typography textAlign="start">{props.description}</Typography>
            </Box>
        </Box>
        </div>
        </>
    );
}

export default ConversationCard;