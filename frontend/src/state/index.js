import { AppStateProvider } from './useAppState';

export const GlobalAppStateProvider = ({ children }) => {
  const Providers = [AppStateProvider];

  let element = children;

  while (Providers.length > 0) {
    const Component = Providers.pop();
    element = <Component>{element}</Component>;
  }
  return element;
};

export { useAppState } from './useAppState';
