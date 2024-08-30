import React, { useEffect, useState } from 'react';
import { fetchUserExchange } from '../../data/mockData'; // Adjust the import path based on your project structure
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const UserExchangeDashboard = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const getExchanges = async () => {
      try {
        const data = await fetchUserExchange(); // Fetch exchanges data using your API call
        if (data && data.data) {
          setExchanges(data.data); // Assuming the exchange data is in data.data array
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getExchanges();
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
    <Box m="20px">
      <Typography variant="h4" mb={2} color="#48D1CC">
        User Exchanges
      </Typography>

      {exchanges.length === 0 ? (
        <Typography variant="h6" color="black">No exchanges available</Typography>
      ) : (
        <Grid container spacing={3}>
          {exchanges.map((exchange) => (
            <Grid item xs={12} md={6} lg={4} key={exchange.id}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: "#f5f5f5" }}>
                <Typography variant="h6" mb={2} color="black">
                  Exchange ID: {exchange.id}
                </Typography>
                <Typography variant="body1" color="black"><strong>Voucher Title:</strong> {exchange.voucher_title}</Typography>
                <Typography variant="body1" color="black"><strong>Description:</strong> {exchange.voucher_description}</Typography>
                <Typography variant="body1" color="black"><strong>Points Used:</strong> {exchange.point_used}</Typography>
                <Typography variant="body1" color="black"><strong>Is Used:</strong> {exchange.is_used ? 'Yes' : 'No'}</Typography>
                <Typography variant="body1" color="black"><strong>Created At:</strong> {new Date(exchange.created_at).toLocaleString()}</Typography>
                <Typography variant="body1" color="black"><strong>Updated At:</strong> {new Date(exchange.updated_at).toLocaleString()}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UserExchangeDashboard;
