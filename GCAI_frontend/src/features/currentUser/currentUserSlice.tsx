import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../types/types';
import type { RootState } from '../../app/store'

interface CurrentUserState {
    value: User
}

const initialState: CurrentUserState = {
    value: {id: -1,
        name: "noname",
        email: "noemail",
        imageUrl: "noimgurl",
        emailVerified: "false",
        provider: "noprovider",
        providerId: "noproviderid"},  
  }

  export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers:{
        setCurrentUser: (state, action: PayloadAction<User>)=>{
            state.value=action.payload
        }
    },
})

export const { setCurrentUser }=currentUserSlice.actions

export const selectCurrentUser = (state: RootState) => state.currentUser.value

export default currentUserSlice.reducer