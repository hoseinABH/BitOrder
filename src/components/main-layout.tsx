// Common components
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <main className="relative flex min-h-screen">
      <Outlet />
    </main>
  );
}
