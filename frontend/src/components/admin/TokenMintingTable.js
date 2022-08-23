import { LoadingButton } from '@mui/lab';
import { Grid, FormLabel, TextField, Button } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useAppState } from 'state';
import { toChecksumAddress, xdcToEthAddress } from 'helpers/web3';
import { useSnackbar } from 'notistack';

const TokenMintingTable = () => {
  const { account, mintToken } = useAppState();
  const { enqueueSnackbar } = useSnackbar();

  console.log('🚀 ~ file: Home.js ~ line 53 ~ Home ~ account', account);

  const MintSchema = Yup.object().shape({
    address: Yup.string().required('Recipient Address is required'),
    quantity: Yup.number().required('Quantity is required')
  });

  const formik = useFormik({
    initialValues: {
      address: '',
      quantity: ''
    },
    validationSchema: MintSchema,
    onSubmit: async (data, { resetForm }) => {
      console.log(data);

      try {
        const _address = toChecksumAddress(xdcToEthAddress(data.address));
        const _qty = data.quantity;
        const res = await mintToken(_address, _qty);
        // const res = await contract.methods.mint(data.address, data.quantity).send({
        //   from: account
        // });

        console.log('🚀 ~ file: TokenMintingTable.js ~ line 128 ~ res ~ res', res);
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
            <FormLabel>Mint to</FormLabel>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
              label="Address"
              {...getFieldProps('address')}
              size="small"
              autoComplete="off"
              type="text"
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
          </Grid>

          <Grid item lg={6} md={6} xs={12}>
            <TextField
              sx={{ mt: 4 }}
              fullWidth
              label="Quantity"
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
