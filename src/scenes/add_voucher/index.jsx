<<<<<<< HEAD
import React, { useState } from 'react';
import { createVoucher } from '../../data/mockData'; // Adjust the import path based on your project structure
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CreateVoucher = () => {
  const [formData, setFormData] = useState({
    require_point: '',
    title: '',
    description: '',
    provider: '',
    url: '',
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
      const response = await createVoucher(formData);
      if (response) {
        alert('Voucher created successfully!');
        setFormData({
          require_point: '',
          title: '',
          description: '',
          provider: '',
          url: '',
        });
      } else {
        alert('Failed to create voucher.');
      }
    } catch (error) {
      setError(error.message);
=======
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createVoucher } from "../../data/mockData";

const CreateVoucherForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log("Form values:", values); // Log form values
    try {
      const Voucher = {
        name: values.name,
        description: values.description,
        url: values.url,
        point: values.point,
      };

      const createdVoucher = await createVoucher(Voucher);
      if (createdVoucher) {
        console.log("Voucher created successfully:", createdVoucher);
        resetForm();
      }
    } catch (error) {
      console.error("Error:", error);
>>>>>>> 1df1d0b6ed536c2326a93596fdefd570f601adb7
    }
  };

  return (
<<<<<<< HEAD
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
        Create Voucher
      </Typography>

      <TextField
        label="Required Points"
        name="require_point"
        type="number"
        value={formData.require_point}
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
          backgroundColor: '#E6E6FA	', // Light grey input background
          borderRadius: '5px',
        }}
      />

      <TextField
        label="Title"
        name="title"
        value={formData.title}
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

      <TextField
        label="Provider"
        name="provider"
        value={formData.provider}
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
        label="URL"
        name="url"
        value={formData.url}
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
        Create Voucher
      </Button>
=======
    <Box m="20px">
      <Header title="CREATE VOUCHER" subtitle="Create voucher for employee" />

      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Voucher Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 4" }}
                color="secondary"
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 4" }}
                color="secondary"
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Url"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.url}
                name="url"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 4" }}
                color="secondary"
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Point"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.point}
                name="point"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 4" }}
                color="secondary"
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Voucher
              </Button>
            </Box>
          </form>
        )}
      </Formik>
>>>>>>> 1df1d0b6ed536c2326a93596fdefd570f601adb7
    </Box>
  );
};

<<<<<<< HEAD
export default CreateVoucher;
=======
// Initial form values
const initialValues = {
  name: "",
  description: "",
  url: "",
  point: "",
};

export default CreateVoucherForm;
>>>>>>> 1df1d0b6ed536c2326a93596fdefd570f601adb7
