import React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Grid, FormLabel, TextField, Button, Box } from '@mui/material';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useAppState } from 'state';
import { toChecksumAddress, xdcToEthAddress } from 'helpers/web3';
import { LoadingButton } from '@mui/lab';

export const Initiator = () => {
  const { setInitiator, web3 } = useAppState();
  const { enqueueSnackbar } = useSnackbar();

  const InitiatorValidation = Yup.object().shape({
    initiator: Yup.string().required('Initiator is required')
  });

  const formik = useFormik({
    initialValues: {
      initiator: ''
    },
    validationSchema: InitiatorValidation,
    onSubmit: async (data, { resetForm }) => {
      console.log('data', data);

      try {
        const _addr = toChecksumAddress(xdcToEthAddress(data.initiator));
        const res = await setInitiator(_addr);
        console.log('🚀 ~ file: Initiator ~ line 29 ~ res ~ res', res);
        if (res) {
          enqueueSnackbar('Initiator Setup Complete', { variant: 'success' });
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
          <Grid item lg={5} md={5} xs={12}>
            <FormLabel>Initiator Address</FormLabel>
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              {...getFieldProps('initiator')}
              size="small"
              autoComplete="off"
              type="text"
              error={Boolean(touched.initiator && errors.initiator)}
              helperText={touched.initiator && errors.initiator}
            />
          </Grid>
          <Grid item lg={2} md={2} xs={3}>
            <LoadingButton
              loadingPosition="start"
              variant="gradient"
              type="submit"
              sx={{ mt: 4, ml: 2, height: '2.6rem', width: '7.813rem' }}
              loading={isSubmitting}
            >
              Set Initiator
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export const Executor = () => {
  const { setExecutor, web3 } = useAppState();
  const { enqueueSnackbar } = useSnackbar();

  const ExecutorValidation = Yup.object().shape({
    executor: Yup.string().required('Executor is requird')
  });

  const formik = useFormik({
    initialValues: {
      executor: ''
    },
    validationSchema: ExecutorValidation,
    onSubmit: async (data, { resetForm }) => {
      console.log('data', data);
      try {
        const _addr = toChecksumAddress(xdcToEthAddress(data.executor));
        const res = await setExecutor(_addr);
        console.log('🚀 ~ file: Executor ~ line 105 ~ res ~ res', res);
        if (res) {
          enqueueSnackbar('Executor Setup Complete', { variant: 'success' });
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
          <Grid item lg={5} md={5} xs={12}>
            <FormLabel>Executor Address</FormLabel>
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              {...getFieldProps('executor')}
              size="small"
              autoComplete="off"
              type="text"
              error={Boolean(touched.executor && errors.executor)}
              helperText={touched.executor && errors.executor}
            />
          </Grid>
          <Grid item lg={2} md={2} xs={3}>
            <LoadingButton
              loadingPosition="start"
              variant="gradient"
              type="submit"
              sx={{ mt: 4, ml: 2, height: '2.6rem', width: '7.813rem' }}
              loading={isSubmitting}
            >
              Set Executor
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export const MinterAddress = () => {
  const { setMinterWalletAddr, web3 } = useAppState();
  const { enqueueSnackbar } = useSnackbar();

  const ExecutorValidation = Yup.object().shape({
    minter_address: Yup.string().required('Minter Address is requird')
  });

  const formik = useFormik({
    initialValues: {
      minter_address: ''
    },
    validationSchema: ExecutorValidation,
    onSubmit: async (data, { resetForm }) => {
      console.log('data', data);
      try {
        const _addr = toChecksumAddress(xdcToEthAddress(data.minter_address));
        const res = await setMinterWalletAddr(_addr);
        console.log('🚀 ~ file: Executor ~ line 105 ~ res ~ res', res);
        if (res) {
          enqueueSnackbar('Mint Setup Complete', { variant: 'success' });
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
          <Grid item lg={5} md={5} xs={12}>
            <FormLabel>Escrow Wallet Address</FormLabel>
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              {...getFieldProps('minter_address')}
              size="small"
              autoComplete="off"
              type="text"
              error={Boolean(touched.minter_address && errors.minter_address)}
              helperText={touched.minter_address && errors.minter_address}
            />
          </Grid>
          <Grid item lg={2} md={2} xs={3}>
            <LoadingButton
              loadingPosition="start"
              variant="gradient"
              type="submit"
              sx={{ mt: 4, ml: 2, height: '2.6rem', width: '7.813rem' }}
              loading={isSubmitting}
            >
              Set Escrow Wallet
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

const InitiatorExecutor = () => {
  return (
    <Box marginBottom={3}>
      <Initiator />
      <Executor />
      <MinterAddress />
    </Box>
  );
};

export default InitiatorExecutor;
