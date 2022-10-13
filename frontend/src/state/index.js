import { AppStateProvider } from './useAppState';
import { CoreTableProvider } from './useCoreTableState';
import { HttpApiProvider } from './useHttpApi';

export const GlobalAppStateProvider = ({ children }) => {
  const Providers = [AppStateProvider, HttpApiProvider, CoreTableProvider];

  let element = children;

  while (Providers.length > 0) {
    const Component = Providers.pop();
    element = <Component>{element}</Component>;
  }
  return element;
};

export { useCoreTableState } from './useCoreTableState';
export { useAppState } from './useAppState';
export { useHttpApi, useHttpApiLoading } from './useHttpApi';
