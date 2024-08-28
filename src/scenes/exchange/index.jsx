import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchVoucherExchangesData, updateVoucherExchange, fetchVoucherExchangeById } from "../../data/mockData"; // Import the API functions

const ManageVoucherExchange = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const voucherExchangesData = await fetchVoucherExchangesData();
      setData(voucherExchangesData);
    };

    getData();
  }, []);

  const handleUpdate = async (updatedExchange) => {
    const updatedData = await updateVoucherExchange(updatedExchange.id, updatedExchange);
    if (updatedData) {
      setData(data.map((exchange) => (exchange.id === updatedExchange.id ? updatedData : exchange)));
      setOpen(false);
    }
  };

  const handleViewClick = async (id) => {
    const exchange = await fetchVoucherExchangeById(id);
    setSelectedExchange(exchange);
    setViewOpen(true);
  };

  const handleEditClick = (exchange) => {
    setSelectedExchange(exchange);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    setSelectedExchange({
      ...selectedExchange,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "voucher_title",
      headerName: "Voucher Title",
      flex: 0.5,
    },
    {
        field: "voucher_description",
        headerName: "Description",
        flex: 0.5,
    },
    {
        field: "user_id",
        headerName: "User ID",
        flex: 0.5,
    },
    {
      field: "point_used",
      headerName: "Points",
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
            onClick={() => handleViewClick(params.row.id)}
            sx={{ marginRight: 1 }}
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
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="VOUCHER EXCHANGES" subtitle="Managing Voucher Exchanges" />
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
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>

      {/* Dialog for Editing */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Voucher Exchange</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="User ID"
            name="user_id"
            value={selectedExchange?.user_id || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Voucher ID"
            name="voucher_id"
            value={selectedExchange?.voucher_id || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Exchange Date"
            name="exchange_date"
            value={selectedExchange?.exchange_date || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(selectedExchange)} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Viewing */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
        <DialogTitle>View Voucher Exchange</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="User ID"
            name="user_id"
            value={selectedExchange?.user_id || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Points"
            name="point_used"
            value={selectedExchange?.point_used || ''}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="is_used"
            name="is_used"
            value={selectedExchange?.is_used || ''}
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

export default ManageVoucherExchange;
