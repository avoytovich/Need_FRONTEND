import React, { useEffect } from 'react';
import createPersistedReducer from 'use-persisted-reducer'

import RouterProvider from './routes';
import Context from './utils/context';
import generalReducer from './utils/gereralReducer';


const App = props => {
  const usePersistedReducer = createPersistedReducer('state');
  const [store, dispatch] = usePersistedReducer(generalReducer, {});

  useEffect(() => {}, []);

  //console.log('store', store);
  return (
    <Context.Provider value={{ dispatch, store }}>
      <RouterProvider userId={store.userId} />
    </Context.Provider>
  );
};

export default App;
