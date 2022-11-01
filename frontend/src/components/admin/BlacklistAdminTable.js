import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  FormLabel,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  Chip
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { toChecksumAddress, xdcToEthAddress } from 'helpers/web3';
import { useSnackbar } from 'notistack';
import { useAppState } from 'state';
import * as Yup from 'yup';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BlacklistAdminTable = () => {
  const { checkBlackList, updateBlackList, web3 } = useAppState();
  const { enqueueSnackbar } = useSnackbar();

  const [blackListStatus, setBlackListStatus] = useState(undefined);

  const BlackListValidation = Yup.object().shape({
    blacklist_address: Yup.string().required('Wallet Address is required')
    // isBlacklisted: Yup.string().required('Black List Status is required')
  });

  const formik = useFormik({
    initialValues: {
      blacklist_address: '',
      isBlacklisted: ''
    },
    validationSchema: BlackListValidation,
    onSubmit: async (data, { resetForm }) => {
      console.log('data', data);
      try {
        const _addr = toChecksumAddress(xdcToEthAddress(data.blacklist_address));
        data.isBlacklisted = !blackListStatus;
        const _isBlacklist = data.isBlacklisted;
        console.log(
          '🚀 ~ file: BlacklistAdminTable.js ~ line 45 ~ onSubmit: ~ _isBlacklist',
          _isBlacklist
        );
        const res = await updateBlackList(_addr, _isBlacklist);

        console.log('🚀 ~ file: BlacklistAdminTable.js ~ line 25 ~ res ~ res', res);

        if (res) {
          enqueueSnackbar('Blacklist status updated successfully', { variant: 'success' });
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
          <Grid item lg={5} md={5} xs={12}>
            <FormLabel>Address</FormLabel>
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              {...getFieldProps('blacklist_address')}
              size="small"
              autoComplete="off"
              type="text"
              error={Boolean(touched.blacklist_address && errors.blacklist_address)}
              helperText={touched.blacklist_address && errors.blacklist_address}
            />
          </Grid>
          {/* <Grid item lg={5} md={5} xs={12}>
            <FormLabel>Blacklisted</FormLabel>
            <FormControl size="small" variant="outlined" fullWidth sx={{ mt: 1 }}>
              <Select
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                {...getFieldProps('isBlacklisted')}
                error={Boolean(touched.isBlacklisted && errors.isBlacklisted)}
                helperText={touched.isBlacklisted && errors.isBlacklisted}
                id="isBlacklisted"
              >
                <MenuItem value>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>

              <FormHelperText sx={{ color: '#d32f2f' }}>
                {touched.isBlacklisted && errors.isBlacklisted}
              </FormHelperText>
            </FormControl>
          </Grid> */}
          <Grid item lg={2} md={2} xs={3}>
            <Button
              sx={{ mt: 4, ml: 2, height: '2.6rem', width: '7.813rem' }}
              // eslint-disable-next-line
              onClick={async () => {
                try {
                  const _address = toChecksumAddress(xdcToEthAddress(values.blacklist_address));
                  if (web3.utils.isAddress) {
                    const res = await checkBlackList(_address);
                    setBlackListStatus(res);
                    console.log('🚀 ~ file: BlacklistAdminTable.js ~ line 74 ~ res ~ res', res);
                    return res;
                  } else {
                    enqueueSnackbar('Please enter a valid address', { variant: 'error' });
                  }
                } catch (error) {
                  enqueueSnackbar('Please enter a valid address', { variant: 'error' });
                }
              }}
              variant="contained"
            >
              Check Status
            </Button>
          </Grid>

          {blackListStatus !== undefined && (
            <Grid item lg={2} md={2} xs={3}>
              <Chip
                label={blackListStatus ? 'Blacklisted' : ' Not Blacklisted'}
                color={blackListStatus ? 'error' : 'success'}
                sx={{ mt: 4, height: '2.6rem', borderRadius: '1rem', px: 2 }}
                icon={
                  blackListStatus ? (
                    <CancelIcon color="error" />
                  ) : (
                    <CheckCircleIcon color="success" />
                  )
                }
              />
            </Grid>
          )}
        </Grid>
        <Grid
          container
          sx={{
            width: '100%',
            mt: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          {/* <Grid item lg={12} md={12} xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}> */}
          {/* <Button
            // eslint-disable-next-line
            onClick={async () => {
              try {
                const _address = toChecksumAddress(xdcToEthAddress(values.blacklist_address));
                if (web3.utils.isAddress) {
                  const res = await checkBlackList(_address);
                  setBlackListStatus(res);
                  console.log('🚀 ~ file: BlacklistAdminTable.js ~ line 74 ~ res ~ res', res);
                  return res;
                } else {
                  enqueueSnackbar('Please enter a valid address', { variant: 'error' });
                }
              } catch (error) {
                enqueueSnackbar('Please enter a valid address', { variant: 'error' });
              }
            }}
            variant="contained"
            sx={{ mt: 3, mr: 2, height: '2.6rem', width: '7.813rem' }}
          >
            Check
          </Button> */}
          {blackListStatus !== undefined && (
            <LoadingButton
              loadingPosition="start"
              variant="gradient"
              type="submit"
              sx={{ mt: 3, height: '2.6rem' }}
              loading={isSubmitting}
            >
              {blackListStatus ? 'Remove from Blacklist' : 'Add to Blacklist'}
            </LoadingButton>
          )}
          {/* </Grid> */}
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default BlacklistAdminTable;
