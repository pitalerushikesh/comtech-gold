import { LoadingButton } from '@mui/lab';
import { Grid, FormLabel, TextField, Button } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useAppState } from 'state';
import { toChecksumAddress, xdcToEthAddress } from 'helpers/web3';
import { useSnackbar } from 'notistack';

const TokenMintingTable = ({ barNumber, warrantNumber }) => {
  const { account, mintToken, cancelInitiateMint } = useAppState();
  const { enqueueSnackbar } = useSnackbar();

  console.log('🚀 ~ file: Home.js ~ line 53 ~ Home ~ account', account);

  const MintSchema = Yup.object().shape({
    address: Yup.string().required('Recipient Address is required'),
    quantity: Yup.number().required('Quantity is required'),
    bar_number: Yup.string()
      .required('Bar Number is required')
      .max(10, 'Bar Number cannot be more than 10 characters'),
    warrant_number: Yup.string()
      .required('Warrant Number is required')
      .max(10, 'Warrant Number cannot be more than 10 characters')
  });

  const formik = useFormik({
    initialValues: {
      address: '',
      // address: 'xdc821ab84ce0aC467b3e30F462059577B2cecD8B76',
      quantity: '1000',
      bar_number: barNumber,
      warrant_number: warrantNumber
    },
    validationSchema: MintSchema,
    onSubmit: async (data, { resetForm }) => {
      console.log(data);

      try {
        const _address = toChecksumAddress(xdcToEthAddress(data.address));
        const _qty = data.quantity;
        const _barNumber = data.bar_number;
        const _warrantNumber = data.warrant_number;
        const res = await mintToken(_address, _qty, _barNumber, _warrantNumber);
        // const res = await contract.methods.mint(data.address, data.quantity).send({
        //   from: account
        // });

        console.log('🚀 ~ file: TokenMintingTable.js ~ line 128 ~ res ~ res', res);
        if (res) {
          enqueueSnackbar('Token mint successful', { variant: 'success' });
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
            <FormLabel>Address</FormLabel>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
              {...getFieldProps('address')}
              size="small"
              autoComplete="off"
              type="text"
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
              // disabled
              // inputProps={{ readOnly: true }}
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
              error={Boolean(touched.quantity && errors.quantity)}
              helperText={touched.quantity && errors.quantity}
              disabled
              inputProps={{ readOnly: true }}
            />
          </Grid>
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
              disabled
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
              disabled
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
              sx={{ mt: 3, mr: 3, height: '2.6rem', width: '7.813rem' }}
              onClick={async () => {
                try {
                  console.log(
                    'Bar Number & Warrant Number 🚀',
                    values.bar_number,
                    values.warrant_number
                  );
                  const res = await cancelInitiateMint(values.bar_number, values.warrant_number);
                  if (res) {
                    enqueueSnackbar('Token mint cancelled', { variant: 'success' });
                  }
                } catch (e) {
                  console.log(e);
                  if (e.message) {
                    enqueueSnackbar(e.message, { variant: 'error' });
                  }
                }
              }}
            >
              Cancel Mint
            </Button>
            <LoadingButton
              loadingPosition="start"
              variant="gradient"
              type="submit"
              sx={{ mt: 3, height: '2.6rem', width: '7.813rem' }}
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
