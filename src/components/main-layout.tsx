// Common components
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <main className="relative container mx-auto flex min-h-screen px-4 py-16 md:px-8">
      <Outlet />
    </main>
  );
}
