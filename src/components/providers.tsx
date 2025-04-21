import { type ReactNode, StrictMode } from 'react';
import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction'; // Adjust the import path as needed
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StrictMode>
      <RadixDirectionProvider dir="rtl">
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
      </RadixDirectionProvider>
    </StrictMode>
  );
}
