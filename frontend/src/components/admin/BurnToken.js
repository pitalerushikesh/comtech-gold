import { LoadingButton } from '@mui/lab';
import { Grid, FormLabel, TextField, Button } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useAppState } from 'state';
import { useSnackbar } from 'notistack';

const BurnToken = () => {
  const { account, burnToken } = useAppState();
  const { enqueueSnackbar } = useSnackbar();

  const MintSchema = Yup.object().shape({
    quantity: Yup.number().required('Quantity is required')
  });

  const formik = useFormik({
    initialValues: {
      quantity: ''
    },
    validationSchema: MintSchema,
    onSubmit: async (data, { resetForm }) => {
      console.log(data);

      try {
        const _qty = data.quantity;
        const res = await burnToken(_qty);

        console.log('🚀 ~ file: BurnToken.js ~ line 17 ~ onSubmit: ~ res', res);

        if (res) {
          resetForm();
        }
      } catch (e) {
        console.log(e);
        if (e.message) {
          enqueueSnackbar(e.message, { variant: 'error' });
        }
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

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
            <FormLabel>Quantity</FormLabel>
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              size="small"
              {...getFieldProps('quantity')}
              autoComplete="off"
              type="number"
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
            <LoadingButton
              loadingPosition="start"
              variant="gradient"
              type="submit"
              sx={{ mt: 2, height: '2.6rem', width: '7.813rem' }}
              loading={isSubmitting}
            >
              Burn
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default BurnToken;
