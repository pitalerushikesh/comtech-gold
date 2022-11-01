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

const CheckEditBarPause = () => {
  const { checkEditBarStatus, updateEditBarStatus, web3 } = useAppState();
  const { enqueueSnackbar } = useSnackbar();

  const [blackListStatus, setBlackListStatus] = useState(undefined);

  // const CheckEditBarPauseValidation = Yup.object().shape({
  //   blacklist_address: Yup.string().required('Wallet Address is required')
  //   // isBlacklisted: Yup.string().required('Black List Status is required')
  // });

  const formik = useFormik({
    initialValues: {
      // blacklist_address: '',
      isBlacklisted: ''
    },
    // validationSchema: CheckEditBarPauseValidation,
    onSubmit: async (data, { resetForm }) => {
      console.log('data', data);
      try {
        data.isBlacklisted = !blackListStatus;
        const _isBlacklist = data.isBlacklisted;
        console.log(
          '🚀 ~ file: CheckEditBarPause.js ~ line 45 ~ onSubmit: ~ _isBlacklist',
          _isBlacklist
        );
        const res = await updateEditBarStatus(_isBlacklist);

        console.log('🚀 ~ file: CheckEditBarPause.js ~ line 25 ~ res ~ res', res);
        if (res) {
          enqueueSnackbar('Edit Bar status updated successfully', { variant: 'success' });
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
          <Grid item lg={2} md={2} xs={3}>
            <Button
              sx={{ mt: 4, ml: 2, height: '2.6rem', width: '7.813rem' }}
              // eslint-disable-next-line
              onClick={async () => {
                try {
                  const res = await checkEditBarStatus();
                  setBlackListStatus(res);
                  console.log('🚀 ~ file: CheckEditBarPause.js ~ line 74 ~ res ~ res', res);
                  return res;
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
                label={blackListStatus ? 'Pause' : ' Un-Pause'}
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
          {blackListStatus !== undefined && (
            <LoadingButton
              loadingPosition="start"
              variant="gradient"
              type="submit"
              sx={{ mt: 3, height: '2.6rem' }}
              loading={isSubmitting}
            >
              {blackListStatus ? 'Unpause' : 'Pause'}
            </LoadingButton>
          )}
          {/* </Grid> */}
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default CheckEditBarPause;
