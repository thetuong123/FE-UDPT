import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { fetchWorkLogsData } from "../../data/mockData";

const ManageWorkLogs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState("2024-08-28T00:00:00");
  const [endDate, setEndDate] = useState("2024-08-31T23:59:59");

  useEffect(() => {
    const getData = async () => {
      const workLogsData = await fetchWorkLogsData(page, limit, startDate, endDate);
      setData(workLogsData);
    };

    getData();
  }, [page, limit, startDate, endDate]);

  const handleSearch = async () => {
    const workLogsData = await fetchWorkLogsData(page, limit, startDate, endDate);
    setData(workLogsData);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "user_id", headerName: "User ID", flex: 1 },
    { field: "check_in", headerName: "Check-In", flex: 1 },
    { field: "check_out", headerName: "Check-Out", flex: 1 },
    { field: "note", headerName: "Note", flex: 1 },
    { field: "created_at", headerName: "Created At", flex: 1 },
    { field: "updated_at", headerName: "Updated At", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Start Date"
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="End Date"
          variant="outlined"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

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
        <DataGrid 
          checkboxSelection 
          rows={data} 
          columns={columns} 
          page={page} 
          pageSize={limit} 
          onPageChange={(newPage) => setPage(newPage)} 
          onPageSizeChange={(newPageSize) => setLimit(newPageSize)} 
        />
      </Box>
    </Box>
  );
};

export default ManageWorkLogs;
