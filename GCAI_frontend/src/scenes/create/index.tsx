import { tokens } from "../../theme";
import { Avatar, Box,Button,Link,Slider,TextField,Typography,colors,useTheme } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Textarea from '@mui/joy/Textarea';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPutChatbots } from "../../utils/utils";
import { Chatbot } from "../../types/types";
import { API_BASE_URL } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addBot } from "../../features/conversation/conversationSlice";

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

function valuetext(value: number) {
    return `${value}°C`;
}

const CharacteristicComponent=(props:{name:string,minVal:number,maxVal:number,step:number,onSliderChange: (value: number) => void;})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <>
        <Typography component="h1" variant="h3" sx={{alignSelf:"start", marginLeft:20, color:colors.grey[300], marginBottom:2}}>{props.name}</Typography>
        <Slider
        aria-label={props.name}
        defaultValue={30}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={props.step}
        marks
        min={props.minVal}
        max={props.maxVal}
        sx={{width:"85%", alignSelf:"center"}}
        onChange={(event, value:any) => props.onSliderChange(value)}
        onChangeCommitted={(event, value:any) => props.onSliderChange(value)}
        />
        </>
    );
}



const CreateNewBot=()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigator=useNavigate()
    const conversation= useAppSelector((state:any) => state.conversation.value)
    const dispatch = useAppDispatch()

    const onDone=()=>{
        let ta:any=currentDescription.current
        let name:any=currentName.current
        // console.log(name.value)
        // console.log(ta.value)
        
        let desc="Friendly(0 to 100): "+slider1Value+", Funny(0 to 100): "+slider3Value+", Smart(0 to 100): "+slider3Value+". Name is "+name.value+" .Description of the chatbot is the following: "+ta.value
        let chatbot:Chatbot={
            id:999,
            name:name.value,
            description:desc
        }
        console.log(desc)
        apiPutChatbots<Chatbot>(API_BASE_URL+"/chatbots",chatbot).then((val)=>{
            let created=(val as Chatbot)
            dispatch(addBot(created))
            return val
        })
        ta.value=""
        name.value=""
        navigator("/chats")
        
    }
    const currentName=useRef<string>() 
    const currentDescription=useRef<string>() 
    const currentSlider=useRef<string>() 

    const [slider1Value, setSlider1Value] = useState(30);
    const handleSlider1Change = (value:any) => {
        // Update the state variable
        setSlider1Value(value);
        // Do something else with the value
        console.log(slider1Value);
      };
        
      const [slider2Value, setSlider2Value] = useState(30);
    const handleSlider2Change = (value:any) => {
        // Update the state variable
        setSlider2Value(value);
        // Do something else with the value
        console.log(value);
      };
      const [slider3Value, setSlider3Value] = useState(30);
      const handleSlider3Change = (value:any) => {
          // Update the state variable
          setSlider3Value(value);
          // Do something else with the value
          console.log(value);
        };
    return (
        <>
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="132px"
            gap="20px"
            overflow="auto"
        >
            <Box
                sx={{backgroundColor:colors.grey[500], borderRadius:4}}
                gridColumn="span 12"
                gridRow="span 1"
                
            >
                <Box
                display="flex"
                flexDirection="row"
                width="100%"
                height="100%"
                justifyContent="space-between"
                >

                    <Box
                    display="flex"
                    flexDirection="row"
                    // width="100%"
                    height="100%"
                    justifyContent="start"
                    >
                        <Avatar sx={{alignSelf:"center",marginLeft:5, marginRight:3, ":hover":{backgroundColor:colors.purpleAccent[500]}}}><AddAPhotoIcon sx={{scale:10}}></AddAPhotoIcon></Avatar>
                        <TextField 
                        sx={{backgroundColor:colors.bgk[500],borderRadius:10,marginTop:2,marginBottom:2, alignSelf:"center", marginLeft:1}} 
                        InputProps={{ sx: { borderRadius: 10 },}}
                        placeholder="Bot Name"
                        inputRef={currentName}
                        ></TextField>
                    </Box>
                    <Button variant="contained" sx={{height:"30%", alignSelf:"center", marginRight:10, backgroundColor:colors.purpleAccent[500]}} onClick={onDone}>DONE</Button>                   
                </Box>
            </Box>
                            
            
            <Box
                sx={{backgroundColor:colors.grey[500], borderRadius:4}}
                gridColumn="span 12"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                // alignItems="center"
                justifyContent="center"
            >
                <CharacteristicComponent name={"Friendly"} minVal={0} maxVal={100} step={10} onSliderChange={handleSlider1Change}/>
            </Box>
            <Box
                sx={{backgroundColor:colors.grey[500], borderRadius:4}}
                gridColumn="span 12"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                // alignItems="center"
                justifyContent="center"
            >
                <CharacteristicComponent name={"Funny"} minVal={0} maxVal={100} step={10} onSliderChange={handleSlider2Change}/>
            </Box>
            <Box
                sx={{backgroundColor:colors.grey[500], borderRadius:4}}
                gridColumn="span 12"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                // alignItems="center"
                justifyContent="center"
            >
                <CharacteristicComponent name={"Smart"} minVal={0} maxVal={100} step={10} onSliderChange={handleSlider3Change}/>
            </Box>
            <Box
                sx={{backgroundColor:colors.grey[500], borderRadius:4}}
                gridColumn="span 12"
                gridRow="span 2"
                display="flex"
                flexDirection="column"
                // alignItems="center"
                justifyContent="center"
            >
                <Typography component="h1" variant="h3" sx={{alignSelf:"start", marginLeft:20, color:colors.grey[300], marginBottom:1}}>Custom</Typography>
                <Typography component="h1" variant="h4" sx={{alignSelf:"start", marginLeft:18, color:colors.grey[400], marginBottom:2}}>Describe how your bot should behave, what personality should have etc.</Typography>
                <textarea
                    placeholder="Type in here ... "
                    ref={currentDescription}
                    rows={5}
                    cols={20}
                    maxLength={4000}
                    style={{resize:"none",width:"85%", alignSelf:"center", borderRadius:10, backgroundColor:colors.grey[400], color:colors.grey[200], fontSize:20,outline:"none", border:"none", padding:10}}
                    // minRows={2}
                    // maxRows={4}
                />
            </Box>
        </Box>
        <Copyright sx={{ mt: 2}} />
        </>
    );
}

export default CreateNewBot;