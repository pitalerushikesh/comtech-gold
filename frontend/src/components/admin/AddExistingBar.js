import { LoadingButton } from '@mui/lab';
import { Grid, FormLabel, TextField } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useAppState } from 'state';
import { useSnackbar } from 'notistack';

const AddExistingBar = () => {
  const { account, addExistingBar } = useAppState();
  const { enqueueSnackbar } = useSnackbar();

  const AddBarSchema = Yup.object().shape({
    bar_number: Yup.string()
      .required('Bar Number is required')
      .max(10, 'Bar Number cannot be more than 10 characters'),
    warrant_number: Yup.string()
      .required('Warrant Number is required')
      .max(10, 'Warrant Number cannot be more than 10 characters')
  });

  const formik = useFormik({
    initialValues: {
      bar_number: '',
      warrant_number: ''
    },
    validationSchema: AddBarSchema,
    onSubmit: async (data, { resetForm }) => {
      try {
        const _barNumber = data.bar_number;
        const _warrantNumber = data.warrant_number;
        const res = await addExistingBar(_barNumber, _warrantNumber);
        if (res) {
          enqueueSnackbar('Bar added successfully', { variant: 'success' });
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
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

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
              fullWidth
              sx={{ mt: 1 }}
              {...getFieldProps('bar_number')}
              size="small"
              autoComplete="off"
              type="text"
              error={Boolean(touched.bar_number && errors.bar_number)}
              helperText={touched.bar_number && errors.bar_number}
            />
          </Grid>

          <Grid item lg={6} md={6} xs={12}>
            <FormLabel>Warrant Number</FormLabel>
            <TextField
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
              sx={{ mt: 3, height: '2.6rem', width: '7.813rem' }}
              loading={isSubmitting}
            >
              Add Bar
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default AddExistingBar;
