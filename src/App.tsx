import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from '@/components/layouts';
import HomePage from '@/modules/home/pages/HomePage';
import AdminPages from './modules/admin/pages/AdminPages';
import LoginPages from './modules/Auth/pages/LoginPages';

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
          element: <HomePage />,
        },
        {
          path: 'about',
          element: <h1>About</h1>,
        },
        {
          path: 'admin',
          element: <AdminPages />,
          children: [
            {
              path: 'login',
              element: <LoginPages />
            },
            {
              path: 'signup',
              element: <LoginPages />
            }
          ]
        },

      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
