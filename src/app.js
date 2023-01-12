import React, { useEffect } from 'react';
import createPersistedReducer from 'use-persisted-reducer';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme';

import RouterProvider from './routes';
import Context from './utils/context';
import generalReducer from './utils/gereralReducer';

const App = (props) => {
  const usePersistedReducer = createPersistedReducer('state');
  const [store, dispatch] = usePersistedReducer(generalReducer, {});

  useEffect(() => {}, []);

  // console.log('store', store);
  return (
    <Context.Provider value={{ dispatch, store }}>
      <ThemeProvider theme={theme}>
        <RouterProvider userId={store.userId} />
      </ThemeProvider>
    </Context.Provider>
  );
};

export default App;
