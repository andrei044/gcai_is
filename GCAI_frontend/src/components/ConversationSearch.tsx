import { InputAdornment, TextField,makeStyles,useTheme } from "@mui/material";
import { tokens } from "../theme";
import "./styles.css";
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ConversationCard from "./ConversationCard";
import {api, apiGetMessages} from "../utils/utils";
import { API_BASE_URL } from "../constants";
import {BackendMessage, ChatMessage, Chatbot, MyPayload} from '../types/types'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setBot } from "../features/selected/selectedSlice";
import { addBot, addMessage } from "../features/conversation/conversationSlice";

export default function ConversationSearch() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const selectedBot = useAppSelector((state:any) => state.selected.value)
    const selectedCurrentUser = useAppSelector((state:any) => state.currentUser.value)
    const dispatch = useAppDispatch()
  // const itemList = [
  //   "Apple",
  //   "Orange",
  //   "Banana",
  //   "Cherry",
  //   "Milk",
  //   "Peanuts",
  //   "Butter",
  //   "Tomato",
  //   "Potato",
  //   "Garlic",
  //   "Aubergine",
  //   "Cauliflower",
  // ];
  
  const [itemList,setItemList]=useState<Chatbot[]>([])

  useEffect(()=>{
    api<Chatbot[]>(API_BASE_URL+"/chatbots").then((result)=>{
      setItemList((result as Chatbot[]));
      if((result as Chatbot[]).length>0){
        var firstBot=(result as Chatbot[])[0]
        dispatch(setBot(firstBot))
      }  
      (result as Chatbot[]).forEach((bot)=>{
        //dispatch(addBot(bot))
        let currentBot=bot
        apiGetMessages<BackendMessage[]>(API_BASE_URL+"/messages",currentBot).then((myChatMessages)=>{
          (myChatMessages as BackendMessage[]).forEach((message)=>{
            let convertedMessage:ChatMessage={
              id:message.id,
              timestamp:message.timestamp,
              content:message.content,
              status: "RECEIVED",
              sender: "NO",
            }

            if(message.chatBot){
              convertedMessage.sender="BOT"
            }else{
              convertedMessage.sender="USER"
            }
            let myPayload:MyPayload={
              id:bot.id,
              message:convertedMessage,
            }
            console.log(convertedMessage)
            dispatch(addMessage(myPayload))
          })
        })
      })

      
      return result})
  },[])

  // Specify the type of the state as an array of strings
  const [filteredList, setFilteredList] = useState<Chatbot[]>(itemList);

  // Specify the type of the event parameter as a change event from an input element
  const filterBySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Access input value
    // Use the value property of the input element instead of the target property of the event
    const query = event.currentTarget.value;
    // Create copy of item list
    var updatedList = [...itemList];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  useEffect(()=>{
    var updatedList = [...itemList];
    setFilteredList(updatedList);
  },[itemList])
 

  return (
    <div className="ConversationSearch" style={{
        // maxHeight: "100%",
        // height: "90vh",
        height: "100%",
        display:"flex",
        flexDirection:"column",
        }}>
      <div className="search-header" style={{marginBottom:10}}>
        {/* <input id="search-box" onChange={filterBySearch} /> */}
        <TextField
              InputProps={{ sx: { borderRadius: 10 }, startAdornment:(<InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>), }}
              fullWidth
              id="conversation"
              label=""
              name="conversation"
              onChange={filterBySearch}
              sx={{backgroundColor:colors.bgk[500],borderRadius:10,marginTop:1, width:"80%"}}
              placeholder="Search"
              
            />
      </div>
      <div id="item-list" 
      style={{overflow:"auto"}}
      >
        <ul 
        style={{listStyle:"none", display: "grid", 
        // gridTemplate:"repeat(auto-fit, minmax(100px, 1fr))", 
        gridGap:"10px", 
        padding: 0,
        // listStylePosition:"inside"
        }}
        >
          {filteredList.map((item) => (
            // Use the key property instead of the index parameter
            // <li key={item}>{item}</li>
            <li style={{paddingLeft:15, overflow:"hidden",textOverflow:"ellipsis",}} key={item.name}><ConversationCard id={item.id} name={item.name} description={item.description}/></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
