import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
// Common components
import GlobalError from '@/components/global-error';
import MainLayout from '@/components/main-layout';
// Pages
import { MarketDetails } from '@/pages/market-details';
import { MarketList } from '@/pages/market-list';
// Constants
import * as Routes from '@/constants/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to={Routes.CoinList} />,
      },
      {
        path: Routes.CoinList,
        element: <MarketList />,
      },
      {
        path: `${Routes.CoinList}/:id`,
        element: <MarketDetails />,
      },
    ],
    errorElement: <GlobalError />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
