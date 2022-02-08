import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Register() {

  const token = localStorage.getItem('token');
  if(token){
    window.location.href = '/todo';
  } 

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const [showAlert, setAlert] = React.useState(false);

  const handleSubmit = () => {
    axios.post('http://localhost:5000/register', {
      name: name,
      email: email,
      password: password,
    }).then(res => {
      if (res.status === 200) {
        window.location.href = '/';
      }
      else {
        console.log("failed")
        setAlert(true);
      }
    }).catch(() => {
      console.log("failed");
      setAlert(true);
    });
  };
  React.useEffect(() => {
    if (password === confirmPassword) setDisabled(false);
    else setDisabled(true);
    if(name==="" || email==="" || password==="") setDisabled(true);
  }, [password, confirmPassword])

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={4} >
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showAlert}>
          <Alert variant='filled' severity='error' elevation={10}>
            Email Address alredy exists! Login to your account
          </Alert>
        </Snackbar>
        <Box
          sx={{
            my: 8,
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
            Register
          </Typography>
          <Box component="form" sx={{ mt: 1 }} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              type="text"
              autoComplete="Name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
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
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
              onClick={() => handleSubmit()}
            >
              Register
            </Button>
            <Grid container>
              <Link href="/" variant="body2">
                {"Already have an account? Login"}
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