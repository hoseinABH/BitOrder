import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Providers } from './components/providers.tsx';
// Styles
import './index.css';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>,
);
