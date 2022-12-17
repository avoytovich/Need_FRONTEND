import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { 
  // Dashboard,
  ErrorPage,
  Login,
  Landing,
  // Test
} from './pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default <RouterProvider router={router} />;