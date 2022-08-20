// ----------------------------------------------------------------------

export default function Chip() {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '3px'
        },
        colorSuccess: {
          backgroundColor: '#d4ffe5',
          color: '#085b0e'
        },
        colorPrimary: {
          backgroundColor: '#b2e5ed',
          color: '#00abc5'
        },
        colorWarning: {
          backgroundColor: '#ffefdb',
          color: '#f29423'
        },
        colorDanger: {
          backgroundColor: '#ffefdb',
          color: '#f29423'
        }
      }
    }
  };
}
