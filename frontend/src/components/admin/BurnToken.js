import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Grid, FormLabel, TextField, Button } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useAppState, useCoreTableState } from 'state';
import { useSnackbar } from 'notistack';

const BurnToken = ({ barNumber, warrantNumber }) => {
  const { account, burnToken, cancelInitiateBurn } = useAppState();
  const { goldBars } = useCoreTableState();

  const { enqueueSnackbar } = useSnackbar();

  const BurnSchema = Yup.object().shape({
    quantity: Yup.number().required('Quantity is required'),
    bar_number: Yup.string().required('Bar Number is required'),
    warrant_number: Yup.string().required('Warrant Number is required')
  });

  const formik = useFormik({
    initialValues: {
      quantity: 1000,
      bar_number: barNumber,
      warrant_number: warrantNumber
    },
    validationSchema: BurnSchema,
    onSubmit: async (data, { resetForm }) => {
      try {
        const _qty = data.quantity;
        const _barNumber = data.bar_number;
        const _warrantNumber = data.warrant_number;
        const res = await burnToken(_qty, _barNumber, _warrantNumber);
        if (res) {
          enqueueSnackbar('Token burn successful', { variant: 'success' });
          resetForm();
        }
      } catch (e) {
        if (e.message) {
          enqueueSnackbar(e.message, { variant: 'error' });
        }
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const options = goldBars.map((bar) => {
    return {
      label: bar.bar_number,
      id: bar.bar_number,
      value: bar.bar_number,
      warrant_number: bar.warrant_number
    };
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            mt: 2
          }}
        >
          <Grid item lg={6} md={6} xs={12}>
            <FormLabel>Bar Number</FormLabel>
            <TextField
              disabled
              sx={{ mt: 1 }}
              fullWidth
              size="small"
              {...getFieldProps('bar_number')}
              autoComplete="off"
              type="text"
              error={Boolean(touched.bar_number && errors.bar_number)}
              helperText={touched.bar_number && errors.bar_number}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <FormLabel>Warrant Number</FormLabel>
            <TextField
              disabled
              sx={{ mt: 1 }}
              fullWidth
              size="small"
              {...getFieldProps('warrant_number')}
              autoComplete="off"
              type="text"
              error={Boolean(touched.warrant_number && errors.warrant_number)}
              helperText={touched.warrant_number && errors.warrant_number}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <FormLabel>Quantity</FormLabel>
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              size="small"
              {...getFieldProps('quantity')}
              autoComplete="off"
              type="number"
              disabled
              error={Boolean(touched.quantity && errors.quantity)}
              helperText={touched.quantity && errors.quantity}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            width: '100%',
            mt: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}
        >
          <Grid item lg={12} md={12} xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2, height: '2.6rem', width: '7.813rem', mr: 3 }}
              onClick={async () => {
                try {
                  const res = await cancelInitiateBurn(values.bar_number, values.warrant_number);
                  if (res) {
                    enqueueSnackbar('Burn Cancelled Successfully', { variant: 'success' });
                  }
                } catch (e) {
                  if (e.message) {
                    enqueueSnackbar(e.message, { variant: 'error' });
                  }
                }
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loadingPosition="start"
              variant="gradient"
              type="submit"
              sx={{ mt: 2, height: '2.6rem', width: '7.813rem' }}
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default BurnToken;
