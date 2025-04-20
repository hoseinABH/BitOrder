// Common components
import { Outlet } from 'react-router-dom';
import ThemeToggle from './theme-toggle';

export default function MainLayout() {
  return (
    <main className="relative container mx-auto min-h-screen px-4 py-4 md:px-8 md:py-16">
      <ThemeToggle className="fixed right-6 bottom-14 z-20" />
      <Outlet />
    </main>
  );
}
