import { Box, Button, InputAdornment, TextField,Typography,useTheme } from "@mui/material";
import { tokens } from "../theme";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useRef, useState } from 'react'
import {api, apiPutMessages} from "../utils/utils";
import { API_BASE_URL } from "../constants";
import { BackendMessage, ChatMessage, Chatbot, ConversationMap, MyPayload, ResponsePackage, User } from "../types/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addMessage, setAll } from "../features/conversation/conversationSlice";

interface MyMessage{
    sender:string;
    timestamp:number;
    content:string;
    status:string;
}

// const messages=[
//     {
//       id: 0,
//       sender: 'USER',
//       timestamp: 1641471429497,
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl vitae leo ullamcorper malesuada.',
//       status: 'Received'
//     },
//     {
//       id: 1,
//       sender: 'BOT',
//       timestamp: 1641471434497,
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl vitae leo ullamcorper malesuada. Fusce id lacus quis eros sagittis tincidunt.',
//       status: 'Received'
//     },
//     {
//       id: 2,
//       sender: 'USER',
//       timestamp: 1641471439497,
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       status: 'Received'
//     },
//     {
//       id: 3,
//       sender: 'BOT',
//       timestamp: 1641471444497,
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl vitae leo ullamcorper malesuada. Fusce id lacus quis eros sagittis tincidunt. Quisque euismod nisl sit amet nisi luctus, at aliquet augue consequat.',
//       status: 'Received'
//     },
//     {
//       id: 4,
//       sender: 'USER',
//       timestamp: 1641471449497,
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl vitae leo ullamcorper malesuada. Fusce id lacus quis eros sagittis tincidunt.',
//       status: 'Received'
//     },
//     {
//       id: 5,
//       sender: 'BOT',
//       timestamp: 1641471454497,
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl vitae leo ullamcorper malesuada.',
//       status: 'Received'
//     },
//     {
//       id: 6,
//       sender: 'USER',
//       timestamp: 1641471459497,
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl vitae leo ullamcorper malesuada. Fusce id lacus quis eros sagittis tincidunt. Quisque euismod nisl sit amet nisi luctus, at aliquet augue consequat. Mauris quis sapien quis lorem ultricies ultrices.',
//       status: 'Received'
//     },
//     {
//       id: 7,
//       sender: 'BOT',
//       timestamp: 1641471464497,
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl vitae leo ullamcorper malesuada. Fusce id lacus quis eros sagittis tincidunt.',
//       status: 'Received'
//     },
//     {
//       id: 8,
//       sender: 'USER',
//       timestamp: 1641471469497,
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl vitae leo ullamcorper malesuada. Fusce id lacus quis eros sagittis tincidunt. Quisque euismod nisl sit amet nisi luctus, at aliquet augue consequat.',
//       status: 'Received'
//     },
//     {
//       id: 9,
//       sender: 'BOT',
//       timestamp: 1641471474497,
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       status: 'Received'
//     }
//   ]

const MessageCard=(props:MyMessage)=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    var date = new Date(props.timestamp * 1000).toUTCString()
    return(
    <>  <div>
        <Box sx={{backgroundColor:props.sender === "BOT" ? colors.purpleAccent[500] : colors.greyAccent[500],padding:2, borderRadius:5,marginLeft:2, marginRight:2}}>
            <Typography sx={{textAlign:"left"}}>
                {props.content}
            </Typography>
        </Box>
        <Box>
            <Typography sx={{textAlign:props.sender === "BOT" ?"left":"right", fontSize:12,paddingLeft:props.sender === "BOT" ? 5:0,paddingRight:props.sender === "BOT" ? 0:5}}>
                {new Date(props.timestamp * 1000).toLocaleTimeString()+" "+new Date(props.timestamp).toLocaleDateString()}
            </Typography>
        </Box>
        </div>
    </>
    );
}

const MessagesWindow=()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const selectedBot = useAppSelector((state:any) => state.selected.value)
    const conversation:ConversationMap= useAppSelector((state:any) => state.conversation.value)
    const dispatch = useAppDispatch()
    const [messages,setMessages]=useState<ChatMessage[]>([])
    

    useEffect(()=>{
      let x=conversation[selectedBot.id]
      
      if(x){
        setMessages(x);
      }else{
        setMessages([])
      }
      
    },[selectedBot,conversation])


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
      useEffect(() => {
        scrollToBottom();
      });
      

    return (
        <>
        <Box
        sx={{
            // backgroundColor: colors.purpleAccent[500],
            height:"100%",
            // marginLeft:2,
            // marginRight:2,
            overflow:"auto"
        }}
        >
            <ol 
                style={{listStyle:"none",  
                gridGap:"10px", 
                padding: 0,
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                // transform:"rotate(180deg)",
                }}
                >
                {messages.map((item) => (
                    // Use the key property instead of the index parameter
                    // <li key={item}>{item}</li>
                    <li style={{alignSelf:item.sender === "BOT" ? "start" : "end", maxWidth:"60%", 
                    // transform:"rotate(-180deg)"
                }} key={item.timestamp}><MessageCard sender={item.sender} timestamp={item.timestamp} content={item.content} status={item.status} ></MessageCard></li>
                ))}
                <div ref={messagesEndRef} />
            </ol>

        </Box>
        </>
    );
}






const MessagesTab=()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const selectedBot = useAppSelector((state:any) => state.selected.value)
    const currentUser= useAppSelector((state:any) => state.currentUser.value)
    const conversation:ConversationMap= useAppSelector((state:any) => state.conversation.value)
    const dispatch = useAppDispatch()
    const currentMessage=useRef<string>()

    const onSendMessage=()=>{
      let c:any=currentMessage.current
      console.log(c.value)
      
      console.log(currentUser)
      apiPutMessages<ResponsePackage>(API_BASE_URL+"/messages",selectedBot,currentUser,c.value).then(
        (msg)=>{
          let pac=msg as ResponsePackage 
          let message=pac.chatBotMessage
          let userMessage=pac.chatUserMessage
          let convertedUserMessage:ChatMessage={
            id:userMessage.id,
            timestamp:userMessage.timestamp,
            content:userMessage.content,
            status: "RECEIVED",
            sender: "USER",
          }

          let myUserPayload:MyPayload={
            id:selectedBot.id,
            message: convertedUserMessage,
          }

          dispatch(addMessage(myUserPayload))
          
          let convertedMessage:ChatMessage={
            id:message.id,
            timestamp:message.timestamp,
            content:message.content,
            status: "RECEIVED",
            sender: "BOT",
          }

          let myPayload:MyPayload={
            id:selectedBot.id,
            message: convertedMessage,
          }

          dispatch(addMessage(myPayload))
        }
        
        )
        c.value=""
    }

    return(
        <>
            <Box sx={{
                display:"flex",
                flexDirection:"column", 
                justifyContent:"center",
                height:"100%"
            }}
                >
                <MessagesWindow></MessagesWindow>
                <Box
                sx={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center"

                }}
                >
                    <TextField
                    InputProps={{ sx: { borderRadius: 10 }, startAdornment:(<InputAdornment position="start"><ChatOutlinedIcon></ChatOutlinedIcon></InputAdornment>), }}
                    fullWidth
                    id="messageField"
                    label=""
                    name="messageField"
                    inputRef={currentMessage}
                    sx={{backgroundColor:colors.bgk[500],borderRadius:10,marginTop:2,marginBottom:2, width:"98%", alignSelf:"center", marginLeft:1}}
                    placeholder="Type your message here..."
                    />
                    <Button onClick={onSendMessage} variant="contained" sx={{borderRadius:10, height:"60%", alignSelf:"center", backgroundColor:colors.purpleAccent[500], margin:1}}>
                    <SendIcon sx={{}} /></Button>
                </Box>
                
            </Box>
        </>
    );
}

export default MessagesTab;