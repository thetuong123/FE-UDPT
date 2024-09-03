import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { getMyTimeSheet, UpdateMyTimeSheet } from '../../data/mockData'; // Update the path as needed

const TimeSheet = () => {
  const [timeSheetData, setTimeSheetData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  useEffect(() => {
    // Fetch the timesheet data on component mount
    const fetchData = async () => {
      const data = await getMyTimeSheet();
      if (data) {
        setTimeSheetData(data);
        setUpdatedData(data.current_value); // Initialize the update form with current values
      }
    };
    fetchData();
  }, []);

  const handleChange = (day) => (event) => {
    setUpdatedData({
      ...updatedData,
      [day]: { is_leave: event.target.checked },
    });
  };

  const handleSubmit = async () => {
    const formattedData = {
      current_value: updatedData,
    };

    const response = await UpdateMyTimeSheet(formattedData);
    if (response) {
      console.log('Time Sheet updated successfully:', response);
      // Optionally refresh the data or show a success message
    }
  };

  if (!timeSheetData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2} color="#48D1CC">
        My Time Sheet
      </Typography>

      {/* Previous Values */}
      <Typography variant="h6" color="gray">
        Previous Values:
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(timeSheetData.previous_value).map((day) => (
          <Grid item xs={12} sm={6} md={3} key={day}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: "#e0e0e0"}}>
              <Typography color="black">
                {day.charAt(0).toUpperCase() + day.slice(1)}: {timeSheetData.previous_value[day].is_leave ? 'Leave' : 'Work'}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Current Values */}
      <Typography variant="h6" mt={4} color="gray">
        Current Values:
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(updatedData).map((day) => (
          <Grid item xs={12} sm={6} md={3} key={day}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: "#f5f5f5"}}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={updatedData[day].is_leave}
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

      {/* Submit Button */}
      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleSubmit}>
        Update Time Sheet
      </Button>
    </Box>
  );
};

export default TimeSheet;
