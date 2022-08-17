// ----------------------------------------------------------------------

import { color } from '@mui/system';

export default function LoadingButton() {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        loadingIndicator: {
          color: '#ffffff'
        }
      }
    }
  };
}
