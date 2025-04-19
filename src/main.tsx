import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// Providers
import { ThemeProvider } from './components/theme-provider.tsx';
import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
// Styles
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RadixDirectionProvider dir="rtl">
      <ThemeProvider defaultTheme="system">
        <App />
      </ThemeProvider>
    </RadixDirectionProvider>
  </StrictMode>,
);
