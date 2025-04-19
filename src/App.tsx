import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from '@/components/layouts';
import AdminPages from './modules/admin/pages/AdminPages';

import HomePages from '@/modules/home/pages/HomePages';

import OrderManager from './modules/admin/components/Order/components/OrderManager';
import ProductManager from './modules/home/components/ProductTable/ProductManager';
import AuthPages from './modules/Auth/pages/AuthPages';
import LoginForm from './modules/Auth/components/Login/LoginForm';
import { RegisterForm } from './modules/Auth/components/Register/RegisterForm';
import { ForgetPasswordForm } from './modules/Auth/components/ForgetPassword/ForgetPasswordForm';
import ComfirmPassword from './modules/Auth/components/ForgetPassword/ComfirmPassword';
import { SetNewPasswordForm } from './modules/Auth/components/ForgetPassword/SetNewPasswordForm';

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
          element: <LoginForm />,
        },
        {
          path: 'register',
          element: <RegisterForm />,
        },
        {
          path: 'forget-password',
          element: <ForgetPasswordForm />,
        },
        {
          path: 'confirm-password',
          element: <ComfirmPassword />,
        },
        {
          path: 'new-password',
          element: <SetNewPasswordForm />,
        },
      ],
    },
    // Admin layout
    {
      path: 'admin',
      element: <AdminPages />,
      children: [
        {
          path: 'products',
          element: <ProductManager />,
        },
        {
          path: 'order',
          element: <OrderManager />,
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
