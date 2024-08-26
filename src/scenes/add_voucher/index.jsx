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
    }
  };

  return (
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
    </Box>
  );
};

// Initial form values
const initialValues = {
  name: "",
  description: "",
  url: "",
  point: "",
};

export default CreateVoucherForm;
