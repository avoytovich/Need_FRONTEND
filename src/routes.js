import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Navigate,
} from 'react-router-dom';

import {
  // Dashboard,
  ErrorPage,
  Login,
  Needs,
  NeedDetails,
  AdminPanel,
  Test,
} from 'pages';
import checkAuth from 'utils/checkAuth';

const AuthContext = React.createContext(null);

const AuthProvider = ({ children, userId }) => {
  const isAuth = checkAuth(userId);
  return (
    <AuthContext.Provider value={{ isAuth, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return React.useContext(AuthContext);
};

const ProtectedRoute = ({ children }) => {
  const { isAuth, userId } = useAuth();
  const location = useLocation();

  if (!isAuth || (location.pathname === '/admin' && userId !== 1)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/needs',
    element: (
      <ProtectedRoute>
        <Needs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/needs/:id',
    element: (
      <ProtectedRoute>
        <NeedDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
  {
    path: 'test',
    element: (
      <ProtectedRoute>
        <Test />
      </ProtectedRoute>
    ),
  },
]);

const Routes = (props) => (
  <AuthProvider userId={props.userId}>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default Routes;
