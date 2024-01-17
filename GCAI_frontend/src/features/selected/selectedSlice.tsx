import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Chatbot } from '../../types/types';
import type { RootState } from '../../app/store'

interface SelectedState {
    value: Chatbot
}

const initialState: SelectedState = {
    value: {id:-1,name:"noname",description:"nodesc"},  
  }

export const selectedSlice = createSlice({
    name: 'selected',
    initialState,
    // :
    // {
    //     value: {id:-1,name:"noname",description:"nodesc"} as Chatbot,
    // },
    reducers:{
        setBot: (state, action: PayloadAction<Chatbot>)=>{
            state.value=action.payload
        }
    },
})

export const { setBot }=selectedSlice.actions

export const selectSelected = (state: RootState) => state.selected.value

export default selectedSlice.reducer