import React, { useEffect, useState } from 'react';
import { fetchUserInfo } from '../../data/mockData'; // Adjust the import path based on your project structure
import { Box, Typography, CircularProgress, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchUserInfo(); // Fetch data using the updated fetchUserInfo function
        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor={theme.palette.background.default}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor={theme.palette.background.default}
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#D3D3D3" // Light background color
      color="#1c3f5a" // Deep blue text color
      p={3}
    >
      <Grid
        container
        spacing={3}
        boxShadow={2}
        borderRadius={2}
        bgcolor="#ffffff" // White box background
        width={{ xs: "100%", sm: "1000px", md: "1000px" }} // Increased width to better fill space
        p={3}
      >
        {/* Left Side - Avatar */}
        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
          <Avatar
            src={userInfo?.avatar}
            alt="User Avatar"
            sx={{ width: 150, height: 150 }} // Increased avatar size
          />
        </Grid>

        {/* Right Side - Personal Details */}
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" mb={2} color="#48D1CC">
            Personal Details
          </Typography>
          <Typography variant="h6"><strong>Full Name:</strong> {userInfo.full_name}</Typography>
          <Typography variant="h6"><strong>Username:</strong> {userInfo.username}</Typography>
          <Typography variant="h6"><strong>Personal ID:</strong> {userInfo.id}</Typography>
          <Typography variant="h6"><strong>Email:</strong> {userInfo.email}</Typography>
          <Typography variant="h6"><strong>Citizen ID:</strong> {userInfo.citizen_id}</Typography>
          <Typography variant="h6"><strong>Bonus Point:</strong> {userInfo.bonus_point}</Typography>
          <Typography variant="h6"><strong>Role:</strong> {userInfo.role}</Typography>
          <Typography variant="h6"> <strong>Created At:</strong> {new Date(userInfo.created_at).toLocaleDateString('vi-VN')}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
