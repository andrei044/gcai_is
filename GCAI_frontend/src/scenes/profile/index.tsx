import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { tokens } from "../../theme";
import { useEffect } from "react";
import { api } from "../../utils/utils";
import { setCurrentUser } from "../../features/currentUser/currentUserSlice";
import { User } from "../../types/types";
import { API_BASE_URL } from "../../constants";

export default function ProfilePage(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const currentUser = useAppSelector((state:any) => state.currentUser.value)
    const dispatch = useAppDispatch()

    const getInitials=()=>{
        let name:string = currentUser.name;
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];

        let res = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();

        return res
    }

    useEffect(()=>{
        api<User>(API_BASE_URL+"/profile").then((val)=>{
            let user=val as User
            dispatch(setCurrentUser(user))
        })
    },[])

    return (
        <>  <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor: colors.primary[500],
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 10
                }}
            >
            <Box
                sx={{
                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: colors.primary[400],
                padding:5,
                // paddingTop: 10,
                // paddingBottom: 10,
                // paddingLeft: 5,
                // paddingRight: 5,
                borderRadius: 10
                }}
            >
            <img src={currentUser.imageUrl} alt={getInitials()} className="MuiGridListTile-imgFullHeight" />
            </Box>
            <div style={{display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',}}>
                    
            <div style={{display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',}}>
            <Box
                sx={{
                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: colors.primary[400],
                padding:2,
                // paddingTop: 10,
                // paddingBottom: 10,
                // paddingLeft: 5,
                // paddingRight: 5,
                borderRadius: 3,
                margin:1
                }}
            >
            <Typography variant="h3">Name:</Typography>
            </Box>
            <Box
                sx={{
                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: colors.primary[400],
                padding:2,
                // paddingTop: 10,
                // paddingBottom: 10,
                // paddingLeft: 5,
                // paddingRight: 5,
                borderRadius: 3
                }}
            >
            <Typography variant="h3">{currentUser.name}</Typography>
            </Box>
            </div>
            <div style={{display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',}}>
            <Box
                sx={{
                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: colors.primary[400],
                padding:2,
                // paddingTop: 10,
                // paddingBottom: 10,
                // paddingLeft: 5,
                // paddingRight: 5,
                borderRadius: 3,
                margin:1
                }}
            >
            <Typography variant="h3">Email:</Typography>
            </Box>        
            <Box
                sx={{
                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: colors.primary[400],
                padding:2,
                // paddingTop: 10,
                // paddingBottom: 10,
                // paddingLeft: 5,
                // paddingRight: 5,
                borderRadius: 3
                }}
            >
            <Typography variant="h3">{currentUser.email}</Typography>
            </Box>
            </div>
            <div style={{display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',}}>
            <Box
                sx={{
                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: colors.primary[400],
                padding:2,
                // paddingTop: 10,
                // paddingBottom: 10,
                // paddingLeft: 5,
                // paddingRight: 5,
                borderRadius: 3,
                margin:2
                }}
            >
            <Typography variant="h3">Provider:</Typography>
            </Box>
            <Box
                sx={{
                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: colors.primary[400],
                padding:2,
                // paddingTop: 10,
                // paddingBottom: 10,
                // paddingLeft: 5,
                // paddingRight: 5,
                borderRadius: 3
                }}
            >
            <Typography variant="h3">{currentUser.provider}</Typography>
            </Box>

            </div>
            </div>
            </Box>
        </>
    );
}