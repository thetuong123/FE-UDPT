import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createActivity } from "../../data/mockData"; // Import the createActivity function

const NewActivityForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log("Form values:", values); // Log form values
    try {
      // Prepare the data according to the API schema
      const activityData = {
        title: values.title,
        type: values.type,
        from_date: values.fromDate,
        to_date: values.toDate,
        description: values.description,
      };

      const createdActivity = await createActivity(activityData);
      if (createdActivity) {
        console.log("Activity created successfully:", createdActivity);
        resetForm(); // Reset form fields after successful submission
      } else {
        console.error("Failed to create activity");
      }
    } catch (error) {
      console.error("Error during activity creation:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE ACTIVITY" subtitle="Create a New Activity" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={activitySchema}
      >
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
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                color="secondary"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                color="secondary"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="From Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fromDate}
                name="fromDate"
                color="secondary"
                error={!!touched.fromDate && !!errors.fromDate}
                helperText={touched.fromDate && errors.fromDate}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="To Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.toDate}
                name="toDate"
                color="secondary"
                error={!!touched.toDate && !!errors.toDate}
                helperText={touched.toDate && errors.toDate}
                sx={{ gridColumn: "span 4" }}
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
                color="secondary"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Activity
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// Validation schema
const activitySchema = yup.object().shape({
  title: yup.string().required("required"),
  type: yup.string().required("required"),
  fromDate: yup.string().required("required"),
  toDate: yup.string().required("required"),
  description: yup.string().required("required"),
});

// Initial form values
const initialValues = {
  title: "",
  type: "",
  fromDate: "",
  toDate: "",
  description: "",
};

export default NewActivityForm;
