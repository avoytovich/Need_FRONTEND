import React from 'react';
import { createBrowserRouter, RouterProvider, useLocation, Navigate } from "react-router-dom";

import { 
  // Dashboard,
  ErrorPage,
  Login,
  Landing,
  Test
} from './pages';
import checkAuth from './utils/checkAuth';

const AuthContext = React.createContext(null);

const AuthProvider = ({ children, userId }) => {
  const isAuth = checkAuth(userId);
  return (
    <AuthContext.Provider value={isAuth}>
      {children}
    </AuthContext.Provider>
  );
};

  const useAuth = () => {
    return React.useContext(AuthContext);
  };
  
  const ProtectedRoute = ({ children }) => {
    const isAuth = useAuth();
    const location = useLocation();
  
    if (!isAuth) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  
    return children;
  };

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
  {
    path: "test",
    element: (
      <ProtectedRoute>
        <Test />
      </ProtectedRoute>
    ),
  },
]);

const Routes = (props) => (
  <AuthProvider userId={props.userId} >
    <RouterProvider router={router} />
  </AuthProvider>
);

export default Routes;