import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, Snackbar, Alert } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

export default function Login() {

  const token = localStorage.getItem('token');
  if(token){
    window.location.href = '/todo';
  } 

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [showAlert, setAlert] = React.useState(false);

  const handleSubmit = () => {
    axios.post('http://localhost:5000/login', {
      email: email,
      password: password
    }).then(res => {
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem('token', token);
        window.location.href = '/todo';
      }
      else {
        console.log("failed")
      }
    }).catch(() => {
      console.log("failed 2");
      setAlert(true);
    });
  };
  React.useEffect(() => {
    if (email === "" || password === "") setDisabled(true);
    else setDisabled(false);
  }, [email, password])

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={4} >
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showAlert}>
          <Alert variant='filled' severity='error' elevation={10}>
            Email Address or Password Incorrect! Try Again
          </Alert>
        </Snackbar>
        <Box
          sx={{
            my: 12,
            mx: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
              onClick={() => handleSubmit()}
            >
              Login
            </Button>
            <Grid container>
              <Link href="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/RLw-UC03Gwc)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#fefefe',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
}