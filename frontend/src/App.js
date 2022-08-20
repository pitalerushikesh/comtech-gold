import './App.css';
import Router from './routes';
import ThemeConfig from './theme';
import { GlobalAppStateProvider } from 'state';
import { Web3ReactProvider } from '@web3-react/core';
import { getWeb3Library } from './helpers/web3';

function App() {
  return (
    <Web3ReactProvider getLibrary={getWeb3Library}>
      <ThemeConfig>

        <GlobalAppStateProvider>
          <Router />
        </GlobalAppStateProvider>
      </ThemeConfig>
    </Web3ReactProvider>
  );
}

export default App;
