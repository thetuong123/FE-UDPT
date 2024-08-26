import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { AdminDashBoard } from "../../data/mockData";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const userDetails = AdminDashBoard[0];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="540px"
        gap="30px"
      >
        {/* Personal Details Section */}
        <Box
          gridColumn="span 12"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius="10px"
          boxShadow={`0 4px 8px 0 ${colors.primary[500]}`}
        >
          <Typography variant="h5" fontWeight="bold" color={colors.grey[100]} mb="20px">
            Personal Details
          </Typography>
          <Box 
            display="grid" 
            gridTemplateColumns="repeat(2, 1fr)" 
            gap="20px"
            color={colors.grey[100]}
          >
            <Typography variant="body1">
              <strong>Name:</strong> {userDetails.name}
            </Typography>
            <Typography variant="body1">
              <strong>Father's Name:</strong> {userDetails.fatherName}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {userDetails.dob}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {userDetails.gender}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {userDetails.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {userDetails.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Local Address:</strong> {userDetails.localAddress}
            </Typography>
            <Typography variant="body1">
              <strong>Permanent Address:</strong> {userDetails.permanentAddress}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;