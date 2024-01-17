import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Grid,Paper,Box, Container, Avatar, Typography, TextField, FormControlLabel, Button, Link, Checkbox, CssBaseline } from '@mui/material'
import { ThemeProvider, styled, useTheme } from '@mui/material/styles';
import { ColorModeContext, tokens,useMode } from "./theme.tsx";
import Login from './scenes/login/index.tsx'
import MySidebar from './scenes/global/Sidebar.tsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import MyChat from './scenes/chat/index.tsx'
import CreateNewBot from './scenes/create/index.tsx'
import SignUp from './scenes/signup/index.tsx'
import ProfilePage from './scenes/profile/index.tsx'


document.title = "ChatBot Generator";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const loggedIn=false;
  return (
    <>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app" style={{display:"flex",flexDirection:"row", marginTop:7}}>
          <Routes>
          </Routes>
            <MySidebar hidden={loggedIn} />
              <main className="content" style={{marginLeft:20}}>
              <Routes>
              <Route path="/chats" element={<MyChat />} />
              <Route path="/oauth2/redirect" element={<MyChat />}/>
              <Route path="/chats" element={<MyChat />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<CreateNewBot />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<ProfilePage />} />
              </Routes>
              {/* <Login/> */}
              </main>
            
          </div>
          
      </ThemeProvider>
    </ColorModeContext.Provider>
    </>
  )
}

export default App
