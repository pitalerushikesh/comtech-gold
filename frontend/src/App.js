import './App.css';
import Router from './routes';
import ThemeConfig from './theme';
import { GlobalAppStateProvider } from 'state';

function App() {
  return (
    <ThemeConfig>
      <GlobalAppStateProvider>
        <Router />
      </GlobalAppStateProvider>
    </ThemeConfig>
  );
}

export default App;
