import { tokens } from "../../theme";
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, Link, TextField, Typography, useTheme } from "@mui/material";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { GOOGLE_AUTH_URL, MY_TOKEN } from "../../constants";
import { useEffect } from "react";
  
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

const responseMessage = (credentialResponse: CredentialResponse) => {
    console.log("success:\n"+credentialResponse);
};
const errorMessage = () => {
    console.log("error\n");
};

const Login=()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
    useEffect(()=>{
      localStorage.removeItem(MY_TOKEN)
    })

    return (
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: colors.primary[500],
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 5,
            paddingRight: 5,
            borderRadius: 10
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
          </Avatar> */}
          <Avatar alt="Example Alt" src='src/assets/chatapplogonotext_no_bg.png' sx={{margin:2, height:100, width:100
            }} />
          {/* <Box
            component="img"
            sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src=
            /> */}
          <Typography component="h1" variant="h2" marginBottom={1}>
            LOG IN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              InputProps={{ sx: { borderRadius: 10 } }}
              required
              fullWidth
              id="email"
              label=""
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Email Address"
              sx={{backgroundColor:colors.grey[500],marginTop:3,borderRadius:10,alignItems:'center'}}
            />
            <TextField
              required
              fullWidth
              name="password"
              label=""
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              InputProps={{ sx: { borderRadius: 10 } }}
              sx={{backgroundColor:colors.grey[500],marginTop:3,borderRadius:10,}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{marginTop:1,}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, paddingLeft: 2, paddingRight: 2, backgroundColor: colors.purpleAccent[500], borderRadius: 10}}
            >
              <Typography component="h1" variant="h4" margin={1} >
                Login
            </Typography>
            </Button>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item xs>
                <Link href="#" variant="body2" sx={{color:"#FFFFFF"}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{color:"#FFFFFF"}}>
                  {"Sign Up"}
                </Link>
              </Grid>
              <Grid item>
              
              <Button sx={{color:"#FFFFFF"}} href={GOOGLE_AUTH_URL}><img alt="Example Alt" src='src/assets/signin-button.png' style={{maxWidth:250}} /></Button>
                {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    );
};

export default Login;