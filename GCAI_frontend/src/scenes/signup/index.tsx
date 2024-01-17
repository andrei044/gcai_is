import { ThemeProvider } from "@emotion/react";
import { Container, Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link,useTheme, checkboxClasses } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { tokens } from "../../theme";

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

const SignUp=()=>{
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
    
      return (
        <>
          <Container component="main" maxWidth="xs" style={{backgroundColor:colors.primary[500], borderRadius:20, paddingTop:1, marginTop:75,paddingBottom:25, paddingRight:50,paddingLeft:50}}>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                
              }}
            >
                <Avatar alt="Example Alt" src='src/assets/chatapplogonotext_no_bg.png' sx={{ height:100, width:100,m: 1, bgcolor: colors.primary[500]
            }} />
              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar> */}
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        InputProps={{ sx: { borderRadius: 10 } }}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      placeholder="First Name"
                      autoFocus
                      sx={{backgroundColor:colors.grey[500],borderRadius:10}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        InputProps={{ sx: { borderRadius: 10 } }}
                      required
                      fullWidth
                      id="lastName"
                      placeholder="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      sx={{backgroundColor:colors.grey[500],borderRadius:10}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        InputProps={{ sx: { borderRadius: 10 } }}
                      required
                      fullWidth
                      id="email"
                      placeholder="Email Address"
                      name="email"
                      autoComplete="email"
                      sx={{backgroundColor:colors.grey[500],borderRadius:10}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        InputProps={{ sx: { borderRadius: 10 } }}
                      required
                      fullWidth
                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      sx={{backgroundColor:colors.grey[500],borderRadius:10}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" sx={{
                        [`&, &.${checkboxClasses.checked}`]: {
                          color: colors.purpleAccent[500],
                        },
                      }} />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor:colors.purpleAccent[500], width:"50%" }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2" style={{color:colors.grey[200]}}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
           
          </Container>
          <Copyright sx={{ mt: 5 }} />
        </>
      );
}

export default SignUp;