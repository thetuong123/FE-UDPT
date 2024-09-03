import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { createTimeSheet } from '../../data/mockData'; // Adjust this import based on your actual file structure

const CreateTimeSheet = () => {
  const [timeSheetData, setTimeSheetData] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: true,
    sunday: true,
  });

  const handleChange = (day) => (event) => {
    setTimeSheetData({
      ...timeSheetData,
      [day]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    const formattedData = {
      current_value: {
        monday: { is_leave: timeSheetData.monday },
        tuesday: { is_leave: timeSheetData.tuesday },
        wednesday: { is_leave: timeSheetData.wednesday },
        thursday: { is_leave: timeSheetData.thursday },
        friday: { is_leave: timeSheetData.friday },
        saturday: { is_leave: timeSheetData.saturday },
        sunday: { is_leave: timeSheetData.sunday },
      },
    };

    try {
      console.log('Submitting:', formattedData);
      const response = await createTimeSheet(formattedData);
      
      if (response) {
        console.log('Time Sheet created successfully:', response);
      } else {
        console.error('Failed to create Time Sheet');
      }
    } catch (error) {
      console.error('Error creating Time Sheet:', error);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2} color="#48D1CC">
        Create Time Sheet
      </Typography>

      <Grid container spacing={2}>
        {Object.keys(timeSheetData).map((day) => (
          <Grid item xs={12} sm={6} md={3} key={day}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: "#f5f5f5"}}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={timeSheetData[day]}
                    onChange={handleChange(day)}
                    color="primary"
                  />
                }
                label={<Typography color="black">{day.charAt(0).toUpperCase() + day.slice(1)}</Typography>}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default CreateTimeSheet;
