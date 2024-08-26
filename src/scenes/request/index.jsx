import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { fetchRequestData, updateRequest } from '../../data/mockData';

const RequestManagement = () => {
  const [userId, setUserId] = useState('');
  // const [limit, setLimit] = useState(10); // Comment out or remove this line since limit is hardcoded
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleFetchRequests = async () => {
    if (!userId.trim()) return;
    const data = await fetchRequestData(userId, 1, 10); // Hardcoded limit to 10
    setRequests(data);
  };

  const handleEditClick = (request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleUpdateRequest = async () => {
    if (selectedRequest) {
      const updatedData = await updateRequest(selectedRequest.id, selectedRequest);
      if (updatedData) {
        setRequests(requests.map((request) => (request.id === selectedRequest.id ? updatedData : request)));
        setOpen(false);
      }
    }
  };

  const handleInputChange = (e) => {
    setSelectedRequest({
      ...selectedRequest,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 2 },
    { field: 'description', headerName: 'Description', flex: 3 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleEditClick(params.row)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography variant="h4" mb="20px">Request Management</Typography>

      <Box display="flex" flexDirection="column" gap="20px">
        {/* User ID Input */}
        <TextField
          fullWidth
          label="User ID"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        {/* Fetch Requests Button */}
        <Button variant="contained" color="secondary" onClick={handleFetchRequests}>
          Fetch Requests
        </Button>
      </Box>

      {/* Display Fetched Requests */}
      {requests.length > 0 && (
        <Box mt="20px" height="400px">
          <Typography variant="h6" mb="10px">Requests:</Typography>
          <DataGrid
            rows={requests}
            columns={columns}
            pageSize={10} // Hardcoded page size
            rowsPerPageOptions={[10]} // Hardcoded limit
            disableSelectionOnClick
          />
        </Box>
      )}

      {/* Dialog for Editing */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Request</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Type"
            name="type"
            value={selectedRequest?.type || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={selectedRequest?.description || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Status"
            name="status"
            value={selectedRequest?.status || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateRequest} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RequestManagement;
