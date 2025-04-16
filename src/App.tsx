import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from '@/components/layouts';
import AdminPages from './modules/admin/pages/AdminPages';
import LoginPages from './modules/auth/pages/AuthPages';
import BookingManager from './modules/home/components/BookATable/BookingManager';
import HomePages from '@/modules/home/pages/HomePages';
import AuthPages from './modules/auth/pages/AuthPages';

function App() {
  const router = createBrowserRouter([
    // Main layout
    {
      path: '/',
      element: <MainLayout />,
      children: [
        // Home page
        {
          index: true,
          element: <HomePages />,
        },
        {
          path: 'about',
          element: <h1>About</h1>,
        },

      ],
    },
    {
      path: 'auth',
      element: <AuthPages />,
      children: [
        {
          path: 'login',
          element: <LoginPages />
        }
      ]
    },
    // Admin layout
    {
      path: 'admin',
      element: <AdminPages />,
      children: [
        {
          path: 'booking',
          element: <BookingManager />
        },
      ]
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
