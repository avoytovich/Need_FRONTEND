import React from 'react';
import createPersistedReducer from 'use-persisted-reducer';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';

import { theme } from 'utils/theme';
import RouterProvider from 'routes';
import Context from 'utils/context';
import generalReducer from 'utils/gereralReducer';

import 'react-toastify/dist/ReactToastify.css';

const App = (props) => {
  const usePersistedReducer = createPersistedReducer('state');
  const [store, dispatch] = usePersistedReducer(generalReducer, {});

  // console.log('store', store);
  return (
    <Context.Provider value={{ dispatch, store }}>
      <ThemeProvider theme={theme}>
        <RouterProvider userId={store.userId} />
        <ToastContainer />
      </ThemeProvider>
    </Context.Provider>
  );
};

export default App;
