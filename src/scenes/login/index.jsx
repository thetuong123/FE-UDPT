import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation for username and password
    if (username === "admin" && password === "1") {
      navigate("/admin");
    } else if (username === "employee" && password === "1") {
      navigate("/employee");
    } else {
      setError("Invalid username or password");
    }
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
        <Typography variant="h4" mb={3} color="secondary">
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
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
