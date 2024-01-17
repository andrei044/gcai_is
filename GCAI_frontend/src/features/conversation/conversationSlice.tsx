import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ChatMessage, Chatbot, ConversationMap, MyPayload } from '../../types/types';

interface ConversationState {
    value: ConversationMap
}

const initialState: ConversationState = {
    value: {}
}

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers:{
        addMessage: (state, action: PayloadAction<MyPayload>)=>{
            let messages=state.value[action.payload.id]
            if(messages){
                var i
                var found=false
                for (i = 0; i < messages.length; i++) {
                    if (messages[i].id === action.payload.message.id && messages[i].sender === action.payload.message.sender) {
                        found= true;
                    }
                }
                if(found==false){
                    messages.push(action.payload.message)
                }
                
            }else{
                messages=[]
                messages.push(action.payload.message)
            }
            
            state.value[action.payload.id]=messages;
        },
        addBot: (state, action: PayloadAction<Chatbot>)=>{
            state.value[action.payload.id]=[];
        },
        setAll: (state, action: PayloadAction<ConversationMap>)=>{
            state.value=action.payload
        },
        emptyAll: (state)=>{
            state.value={}
        }
    },
})

export const { addMessage, addBot, setAll, emptyAll } = conversationSlice.actions

export default conversationSlice.reducer