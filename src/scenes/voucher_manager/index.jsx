import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  viewVoucher,
  deleteVoucher,
  viewVoucherByID,
} from "../../data/mockData";

const Voucher = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [Voucher, setVoucher] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const voucher = await viewVoucher();
      setData(voucher);
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    const isDeleted = await deleteVoucher(id);
    if (isDeleted) {
      setData(data.filter((voucher) => voucher.id !== id));
    }
  };

  const handleViewClick = async (id) => {
    const voucher = await viewVoucherByID(id);
    setVoucher(voucher);
    setViewOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.4 },
    {
      field: "name_voucher",
      headerName: "Voucher Name",
      flex: 1,
    },

    {
      field: "decription",
      headerName: "Description",
      flex: 1.1,
    },
    {
      field: "expiry",
      headerName: "Expiry Date",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.9,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleViewClick(params.row.id)}
          >
            View
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
      <Header title="Voucher" subtitle="Voucher Manager" />
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

      <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
        <DialogTitle>Voucher</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Voucher Name"
            name="name"
            value={Voucher?.name || ""}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={Voucher?.description || ""}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Url"
            name="url"
            value={Voucher?.url || ""}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Point"
            name="point"
            value={Voucher?.point || ""}
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

export default Voucher;
