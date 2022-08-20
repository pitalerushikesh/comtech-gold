import PropTypes from 'prop-types';

import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import poppins from '../assets/fonts/Poppins.ttf';
import GlobalStyles from './globalStyles';
import typography from './typography';
import componentsOverride from './overrides';

const ThemeConfig = ({ children }) => {
  const poppinsFont = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: '400',
    src: `local('Poppins'), local('Poppins'), url(${poppins}) format('ttf')`,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
  };
  const theme = createTheme({
    typography,

    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [poppinsFont]
        }
      }
    }
  });
  theme.components = componentsOverride(theme);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default ThemeConfig;
