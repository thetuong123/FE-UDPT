import React, { useState } from 'react';
import { loginUser } from '../../data/mockData';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    loginUser(username, password)
      .then(data => {
        if (data.access_token) {
          setError('');          
          if (data.user.role === 'manager') {
            navigate('/admin');
          } else if (data.user.role === 'employee') {
            navigate('/employee');
          }
        } else {
          setError('Login failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Login error');
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor={theme.palette.background.default}
      p={2}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={4}
        boxShadow={3}
        borderRadius={2}
        backgroundColor={theme.palette.background.paper}
        width={{ xs: "90%", sm: "400px" }}
      >
        <Typography variant="h4" mb={3} color={theme.palette.secondary.main}>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          color="secondary"
          autoFocus
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          color="secondary"
        />
        {error && (
          <Typography variant="body2" color="error" mt={1}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default App;
