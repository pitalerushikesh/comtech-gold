import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Grid, Button, Chip } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import { useAppState } from 'state';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CheckEditBarPause = () => {
  const { checkEditBarStatus, updateEditBarStatus, web3 } = useAppState();
  const { enqueueSnackbar } = useSnackbar();

  const [blackListStatus, setBlackListStatus] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      isBlacklisted: ''
    },
    onSubmit: async (data, { resetForm }) => {
      try {
        data.isBlacklisted = !blackListStatus;
        const _isBlacklist = data.isBlacklisted;
        const res = await updateEditBarStatus(_isBlacklist);
        if (res) {
          enqueueSnackbar('Edit Bar status updated successfully', { variant: 'success' });
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
  const { isSubmitting, handleSubmit } = formik;
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
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default CheckEditBarPause;
