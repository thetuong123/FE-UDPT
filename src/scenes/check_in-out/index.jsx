import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress, Paper } from '@mui/material';
import { checkIn, checkOut } from '../../data/mockData'; // Điều chỉnh đường dẫn import phù hợp với cấu trúc dự án của bạn
import { useTheme } from '@mui/material/styles';

const EmployeeCheckInOut = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleCheckIn = async () => {
    setLoading(true);
    setMessage('');
    const result = await checkIn();
    setLoading(false);

    if (result) {
      setMessage('Check-in successful!');
    } else {
      setMessage('Check-in failed. Please try again.');
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    setMessage('');
    const result = await checkOut();
    setLoading(false);

    if (result) {
      setMessage('Check-out successful!');
    } else {
      setMessage('Check-out failed. Please try again.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor={theme.palette.background.default}
      px={2}
    >
      <Paper elevation={4} sx={{ padding: '40px 30px', textAlign: 'center', borderRadius: 2, maxWidth: 400 }}>
        <Typography variant="h4" mb={3} color="secondary">
          Employee Check-In/Check-Out
        </Typography>

        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckIn}
              sx={{
                mb: 2,
                width: '100%',
                fontSize: '18px',
                py: 1.5,
                bgcolor: '#1E88E5',
                '&:hover': { bgcolor: '#1565C0' }
              }}
            >
              Check-In
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCheckOut}
              sx={{
                width: '100%',
                fontSize: '18px',
                py: 1.5,
                bgcolor: '#E53935',
                '&:hover': { bgcolor: '#D32F2F' }
              }}
            >
              Check-Out
            </Button>
          </>
        )}

        {message && (
          <Typography variant="body1" mt={3} color={message.includes('successful') ? "success.main" : "error.main"}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default EmployeeCheckInOut;
