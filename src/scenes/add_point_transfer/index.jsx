import React, { useState } from 'react';
import { createPointTransfer } from '../../data/mockData'; // Adjust the import path based on your project structure
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CreatePointTransfer = () => {
  const [formData, setFormData] = useState({
    points: '',
    to_user_id: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPointTransfer(formData);
      if (response) {
        alert('Point transfer created successfully!');
        setFormData({
          points: '',
          receiverId: '',
          description: '',
        });
      } else {
        alert('Failed to create point transfer.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      maxWidth="400px"
      mx="auto"
      mt={5}
      p={3}
      bgcolor="#ffffff" // Light background color
      borderRadius="8px"
      boxShadow={3}
      border={`1px solid ${theme.palette.primary.main}`} // Add border color
    >
      <Typography variant="h4" mb={3} color={theme.palette.primary.dark}>
        Add Point Transfer
      </Typography>

      <TextField
        label="Points"
        name="points"
        type="number"
        value={formData.points}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
        InputLabelProps={{
          style: { color: theme.palette.primary.main }, // Change label color
        }}
        InputProps={{
            style: { color: '#000' }, // Change text color to black
          }}
        sx={{
          backgroundColor: '#f0f0f0', // Light grey input background
          borderRadius: '5px',
        }}
      />

      <TextField
        label="Receiver ID"
        name="to_user_id"
        value={formData.to_user_id}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
        InputLabelProps={{
          style: { color: theme.palette.primary.main },
        }}
        InputProps={{
            style: { color: '#000' }, // Change text color to black
          }}
        sx={{
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
        }}
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
        InputLabelProps={{
          style: { color: theme.palette.primary.main },
        }}
        InputProps={{
            style: { color: '#000' }, // Change text color to black
          }}
        sx={{
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
        }}
      />

      {error && (
        <Typography variant="body2" color="error" mt={2}>
          Error: {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: theme.palette.primary.main,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Add Point Transfer
      </Button>
    </Box>
  );
};

export default CreatePointTransfer;
