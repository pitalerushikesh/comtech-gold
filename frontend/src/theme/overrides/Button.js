// ----------------------------------------------------------------------

export default function Button() {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none'
        },
        gradient: {
          background: `linear-gradient(to right, #25aae1 7%, #18bfc5 57%, #0dd1ae 97%)`,
          color: '#fff'
        },
        text: {
          color: '#5178f9'
        },
        containedSecondary: {
          backgroundColor: '#112b3d'
        },
        containedError: {
          backgroundColor: '#ff5e5e'
        },
        outlined: {
          border: '1px solid #36405d',
          color: '#36405d'
        },
        contained: {
          backgroundColor: '#5178f9'
        },
        sizeLarge: {
          height: 48
        }
      }
    }
  };
}
