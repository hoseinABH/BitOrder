import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
// Common components
import { GlobalError } from '@/components/global-error';
import { MainLayout } from '@/components/main-layout';
import { Spinner } from './components/ui/spinner';
// Constants
import * as Routes from '@/constants/routes';

// Pages
const MarketList = lazy(() => import('@/pages/market-list'));
const MarketDetails = lazy(() => import('@/pages/market-details'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <GlobalError />,
    children: [
      {
        index: true,
        element: <Navigate to={Routes.CoinList} replace />,
      },
      {
        path: Routes.CoinList,
        element: (
          <Suspense fallback={<Spinner />}>
            <MarketList />
          </Suspense>
        ),
      },
      {
        path: `${Routes.CoinList}/:id`,
        element: (
          <Suspense fallback={<Spinner />}>
            <MarketDetails />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
