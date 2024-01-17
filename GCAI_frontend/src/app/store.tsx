import { configureStore } from '@reduxjs/toolkit'
import conversationReducer from '../features/conversation/conversationSlice'
import selectedReducer from '../features/selected/selectedSlice'
import currentUserReducer from '../features/currentUser/currentUserSlice'


export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    selected: selectedReducer,
    currentUser: currentUserReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch