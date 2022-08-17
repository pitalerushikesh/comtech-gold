import React from "react";
import { LoadingButton } from "@mui/lab";
import { Grid, FormLabel, TextField, Chip } from "@mui/material";
import { useFormik, Form, FormikProvider, Field } from "formik";

const BlacklistAdminTable = () => {
  const formik = useFormik({
    initialValues: {
      blacklist_address: "",
    },

    onSubmit: async (data, { resetForm }) => {
      console.log(data);
      resetForm();
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: 2,
          }}
        >
          <Grid item lg={5} md={5} xs={12}>
            <FormLabel>Blacklist Address</FormLabel>
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              {...getFieldProps("blacklist_address")}
              size="small"
              autoComplete="off"
              type="text"
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            width: "100%",
            mt: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <LoadingButton
              loadingPosition="start"
              variant="gradient"
              type="submit"
              sx={{ mt: 3, height: "2.6rem", width: "7.813rem" }}
              loading={isSubmitting}
            >
              Blacklist
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default BlacklistAdminTable;
