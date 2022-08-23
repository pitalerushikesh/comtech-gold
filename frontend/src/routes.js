import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'multisig', element: <Navigate to="/" /> }
      ]
    }
  ]);
};

export default Router;
