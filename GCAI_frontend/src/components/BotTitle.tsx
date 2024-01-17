import { Avatar, Box,Typography,useTheme } from "@mui/material";
import { tokens } from "../theme";

const BotTitle=(props:{botName:string})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <>
        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"start"}}>
            <Avatar sx={{marginTop:8,marginLeft:7,scale:"2"}}></Avatar>
            <Typography component="h1" variant="h1" sx={{marginLeft:5,marginTop:7}}>{props.botName}</Typography>
            
        </Box>
        </>
    );
}

export default BotTitle;