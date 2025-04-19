import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
// Common components
import GlobalError from '@/components/global-error';
import MainLayout from '@/components/main-layout';
// Pages
import { MarketDetails } from '@/pages/market-details';
import { MarketList } from '@/pages/market-list';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/market" />,
      },
      {
        path: '/market',
        element: <MarketList />,
      },
      {
        path: '/market/:id',
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
