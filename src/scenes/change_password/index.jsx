import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { changePassword } from "../../data/mockData"; // Import the changePassword function

const ChangePassword = ({ accessToken }) => {
  const theme = useTheme();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await changePassword( oldPassword, newPassword);

    if (result) {
      setSuccess("Password changed successfully!");
    } else {
      setError("Failed to change password. Please try again.");
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
        onSubmit={handleChangePassword}
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
          Change Password
        </Typography>
        <TextField
          label="Old Password"
          variant="outlined"
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          margin="normal"
          color="secondary"
        />
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
          color="secondary"
        />
        {error && (
          <Typography variant="body2" color="error" mt={1}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography variant="body2" color="success" mt={1}>
            {success}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;
