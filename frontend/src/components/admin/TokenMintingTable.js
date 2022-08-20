import { LoadingButton } from '@mui/lab';
import { Grid, FormLabel, TextField, Button } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';

import Contract from 'contracts/ABI.json';
import { useEffect, useState } from 'react';

import { useAppState } from 'state';

const TokenMintingTable = () => {
  // **************************************** Temporary Solution ****************************************//

  // // ************************************** BNC-ONBOARD **************************************//

  // //   wallet connect
  // // set a variable to store instantiated web3
  // let web3;

  // // head to blocknative.com to create a key
  // // const BLOCKNATIVE_KEY = 'blocknative-api-key'

  // // the network id that your dapp runs on
  // const NETWORK_ID = 51;

  // // initialize onboard
  // const onboard = Onboard({
  //   //   dappId: BLOCKNATIVE_KEY,
  //   networkId: NETWORK_ID,
  //   subscriptions: {
  //     wallet: (wallet) => {
  //       // instantiate web3 when the user has selected a wallet
  //       web3 = new Web3(wallet.provider);
  //       console.log({ wallet });
  //       console.log(wallet.provider);
  //       console.log(`${wallet.name} connected!`);
  //     }
  //   }
  // });

  // Prompt user to select a wallet

  // const connectWallet = async () => {
  //   await onboard.walletSelect();
  //   // Run wallet checks to make sure that user is ready to transact
  //   await onboard.walletCheck();
  // };

  // // ************************************** BNC-ONBOARD END **************************************//

  // const { abi, address: token } = Contract;
  // console.log('🚀 ~ file: useAppState.js ~ line 8 ~ AppState ~ token', token);
  // const [account, setAccount] = useState('');

  // const web3 = new Web3(Web3.givenProvider);
  // let contract;
  // const _account = async () => {
  //   const account = await web3.eth.getAccounts().then((accounts) => {
  //     return accounts[0];
  //   });
  //   console.log('🚀 ~ file: Home.js ~ line 38 ~ account ~ account', account);
  //   setAccount(account);
  //   return account;
  // };

  // const safeAppConnector = new SafeAppConnector();
  // useSafeAppConnection(safeAppConnector);

  // const useMultisigStatus = () => {
  //   const [isMultisig, setIsMultisig] = useState(null);

  //   useEffect(() => {
  //     safeAppConnector.isSafeApp().then(setIsMultisig);
  //   }, []);

  //   return { isMultisig };
  // };

  // const { isMultisig } = useMultisigStatus();
  // if (isMultisig) {
  //   console.log('🚀 ~ file: Home.js ~ line 44 ~ useEffect ~ isMultisig', isMultisig);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // } else {
  //   connectWallet();
  // }

  // useEffect(() => {
  //   if (web3) {
  //     console.log('🚀 ~ file: Home.js ~ line 44 ~ useEffect ~ web3', web3);
  //     contract = new web3.eth.Contract(abi, token);
  //     _account();
  //   }
  //   // return;
  // }, [web3]);

  // useEffect(() => {
  //   const acc = _account();

  //   // safeAppConnector.isSafeApp().then(setIsMultisig);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // ********************************************** Temporary Solution ***********************************************//
  const { address, abi } = Contract;
  const { web3, account, connectWallet } = useAppState();

  const contract = new web3.eth.Contract(abi, address);

  // console.log('🚀 ~ file: Home.js ~ line 53 ~ Home ~ token', token);
  // console.log('🚀 ~ file: Home.js ~ line 53 ~ Home ~ contract', contract);
  console.log('🚀 ~ file: Home.js ~ line 53 ~ Home ~ account', account);

  console.log({ account });
  const formik = useFormik({
    initialValues: {
      address: '',
      quantity: ''
    },

    onSubmit: async (data, { resetForm }) => {
      console.log(data);

      const res = await contract.methods.mint(data.address, data.quantity).send({
        from: '0x08c7b249a76aa982b01fabc9a4d990bd39d3119a'
      });
      console.log('🚀 ~ file: TokenMintingTable.js ~ line 128 ~ res ~ res', res);

      resetForm();
    }
  });

  // eslint-disable-next-line no-unused-vars
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Button
        onClick={() => {
          connectWallet();
          console.log({ account });
        }}
      >
        Connect
      </Button>
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
            {JSON.stringify(account)}
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
