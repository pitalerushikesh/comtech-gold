import React from "react";
import { LoadingButton } from "@mui/lab";
import { Grid, FormLabel, TextField, Chip } from "@mui/material";
import { useFormik, Form, FormikProvider, Field } from "formik";

const TokenMintingTable = () => {
  const formik = useFormik({
    initialValues: {
      address: "",
      quantity: "",
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
          <Grid item lg={6} md={6} xs={12}>
            <FormLabel>Mint to</FormLabel>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
              label="Address"
              {...getFieldProps("address")}
              size="small"
              autoComplete="off"
              type="text"
            />
          </Grid>

          <Grid item lg={6} md={6} xs={12}>
            <TextField
              sx={{ mt: 4 }}
              fullWidth
              label="Quantity"
              size="small"
              {...getFieldProps("quantity")}
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
              Mint
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default TokenMintingTable;
