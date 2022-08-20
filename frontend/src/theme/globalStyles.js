// material
import { useTheme } from '@mui/material/styles';
import { GlobalStyles as GlobalThemeStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const theme = useTheme();

  return (
    <GlobalThemeStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        html: {
          width: '100%',
          height: '100%',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        },
        body: {
          width: '100%',
          height: '100%',
          backgroundColor: '#f5f8fa'
        },
        '#root': {
          width: '100%',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column'
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            }
          }
        },
        "input[type='file']": {
          textAlign: 'left',

          border: '2px dashed #24abdf',
          borderRadius: '6px',
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0dd1ae !important'
            }
          }
        },
        "input[type='file']::-webkit-file-upload-button": {
          WebkitAppearance: 'none',
          float: 'right',
          border: '1px solid #aaaaaa',

          borderRadius: '6px',

          margin: '0px',
          marginTop: '-6px !important',
          marginRight: '-10px !important',
          height: '35px',
          width: '176px',
          fontSize: '14px',
          fontFamily: 'Poppins',
          color: '#ffffff',
          background: '#112b3d 0% 0% no-repeat padding-box'
        },
        textarea: {
          '&::-webkit-input-placeholder': {
            color: theme.palette.text.disabled
          },
          '&::-moz-placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled
          },
          '&:-ms-input-placeholder': {
            color: theme.palette.text.disabled
          },
          '&::placeholder': {
            color: theme.palette.text.disabled
          }
        },

        img: { display: 'block', maxWidth: '100%' },

        // Lazy Load Img
        '.blur-up': {
          WebkitFilter: 'blur(5px)',
          filter: 'blur(5px)',
          transition: 'filter 400ms, -webkit-filter 400ms'
        },
        '.blur-up.lazyloaded ': {
          WebkitFilter: 'blur(0)',
          filter: 'blur(0)'
        }
      }}
    />
  );
}
