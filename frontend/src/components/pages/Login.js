import React, { useEffect } from "react";
import axios from 'axios';
import { Box, Button, TextField, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { AuthToken } from "../../auth/AuthToken";
import logo from '../../assets/images/logo.png';

export default function SignIn() {
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      let token = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/sign-in`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      token = token.data;
      AuthToken.set(token);
      const currentUser = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      AuthToken.setCurrentUser(currentUser.data);
      history.push('/home');
    } catch (error) {
      console.log('Fatal Error')
    }
  };

  useEffect(() => {
    const user = AuthToken.get();
    if(user){
      history.push('/home');
    }
  }, [])

  return (
    <Box sx={{ bgcolor: "#84B5FF" }} width="100wh" minHeight="100vh">
      <Box
        sx={{
          borderRadius: 2,
          width: '400px',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: 'translate(-50%, -50%)'
        }}
        position="fixed"
        top="50%"
        left="50%"
      >
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          p: 2,
          bgcolor: '#00BCDD'
        }}
        >
          <img src={logo} alt="Tipa" width={120} />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: '#FFFFFF',
          p: theme => theme.spacing(3, 4),
          gap: theme => theme.spacing(3)
        }}
        >
          <Typography variant="h4" sx={{ color: '#00BCDD', fontWeight: 'bold', textAlign: 'center' }}>
            Welcome to TIPA Customer dashboard
          </Typography>
          <Typography variant="p" sx={{ color: '#000000', textAlign: 'center' }}>
            Access your account with the email and password from your Tipa manager
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 0, p: 0, border: 'none', bgcolor: '#FFFFFF' }}>
            <Typography variant="p">
              Email address
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="shlomi@tipa-corp.com"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Typography variant="p">
              Password
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#00BCDD' }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}