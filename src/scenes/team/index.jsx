import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchTeamData, deleteUser, updateUser, fetchUserById } from "../../data/mockData"; // Import fetchUserById từ api.js

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const teamData = await fetchTeamData();
      setData(teamData);
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    const isDeleted = await deleteUser(id);
    if (isDeleted) {
      setData(data.filter((user) => user.id !== id));
    }
  };

  const handleUpdate = async (updatedUser) => {
    const updatedData = await updateUser(updatedUser.id, updatedUser);
    if (updatedData) {
      setData(data.map((user) => (user.id === updatedUser.id ? updatedData : user)));
      setOpen(false);
    }
  };

  const handleViewClick = async (id) => {
    const user = await fetchUserById(id); // Fetch user data by ID
    setSelectedUser(user);
    setViewOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "full_name",
      headerName: "Full Name",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "citizen_id",
      headerName: "Citizen ID",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "bonus_point",
      headerName: "Bonus Point",
      align: "left",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="info"
            onClick={() => handleViewClick(params.row.id)} // Trigger view dialog
          >
            View
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(params.row)}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
            sx={{ marginRight: 1 }}
          >
            Delete
          </Button>
          
          
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`, // Fixed syntax
          },

        }}
      >
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>

      {/* Dialog for Editing */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="ID"
            name="id"
            value={selectedUser?.id || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Full Name"
            name="full_name"
            value={selectedUser?.full_name || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Username"
            name="username"
            value={selectedUser?.username || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Citizen_id"
            name="citizen_id"
            value={selectedUser?.citizen_id || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Bank Number"
            name="bank_number"
            value={selectedUser?.bank_number || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Tax ID"
            name="tax_id"
            value={selectedUser?.tax_id || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Role"
            name="role"
            value={selectedUser?.role || ''}
            onChange={handleInputChange}
            fullWidth
          />
          
          <TextField
            margin="dense"
            label="Bonus Point"
            name="bonus_point"
            value={selectedUser?.bonus_point || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(selectedUser)} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Viewing */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
        <DialogTitle>View User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Full Name"
            name="full_name"
            value={selectedUser?.full_name || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Username"
            name="username"
            value={selectedUser?.username || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Bank Number"
            name="bank_number"
            value={selectedUser?.bank_number || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Tax ID"
            name="tax_id"
            value={selectedUser?.tax_id || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Role"
            name="role"
            value={selectedUser?.role || ''}
            fullWidth
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;