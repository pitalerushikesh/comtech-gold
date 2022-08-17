import './App.css';
import Router from './routes';
import ThemeConfig from './theme';
import { AppStateProvider } from './state/useAppState';

function App() {
  return (
    <ThemeConfig>
      <AppStateProvider>
        <Router />
      </AppStateProvider>
    </ThemeConfig>
  );
}

export default App;
