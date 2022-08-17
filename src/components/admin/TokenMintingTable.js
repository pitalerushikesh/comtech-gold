import { LoadingButton } from '@mui/lab';
import { Grid, FormLabel, TextField } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';

import Contract from 'contracts/ABI.json';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useSafeAppConnection, SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';

const TokenMintingTable = () => {
  // **************************************** Temporary Solution ****************************************//

  const { abi, address: token } = Contract;
  console.log('🚀 ~ file: useAppState.js ~ line 8 ~ AppState ~ token', token);
  const [account, setAccount] = useState('');

  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(abi, token);

  const _account = async () => {
    const account = await web3.eth.getAccounts().then((accounts) => {
      return accounts[0];
    });
    console.log('🚀 ~ file: Home.js ~ line 38 ~ account ~ account', account);
    setAccount(account);
    return account;
  };

  const safeAppConnector = new SafeAppConnector();
  useSafeAppConnection(safeAppConnector);

  useEffect(() => {
    const acc = _account();
    // safeAppConnector.isSafeApp().then(setIsMultisig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ********************************************** Temporary Solution ***********************************************//

  console.log({ account });
  const formik = useFormik({
    initialValues: {
      address: '',
      quantity: ''
    },

    onSubmit: async (data, { resetForm }) => {
      console.log(data);

      contract.methods.mint(data.address, data.quantity).send({
        from: account
      });

      resetForm();
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
              type="text"
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
