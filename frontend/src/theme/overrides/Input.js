export default function Input(theme) {
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#0f0f36',
          lineHeight: '0.3rem'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 'normal',
          fontStretch: 'normal',
          fontStyle: 'normal',
          lineHeight: 1.5,
          letterSpacing: 'normal',
          textAlign: 'left',
          color: '#8e8ea7',

          '&.Mui-error': {
            display: 'none'
          },
          '&..Mui-standard': {
            display: 'none'
          }
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f8fa',

          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #d8e7f0'
          },

          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground
            }
          },

          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ff5e5e'
            }
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0dd1ae'
            }
          }
        }
      }
    }
  };
}
