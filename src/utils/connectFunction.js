import React, { useContext } from 'react';

import Context from './context';

const connect = (mapStateToProps, mapDispatchToProps) => {
  return (Component) => {
    return (initialProps) => {
      const { dispatch, store } = useContext(Context);
      const stateToProps = mapStateToProps(store);
      const dispatchToProps = mapDispatchToProps(dispatch);
      const props = { ...initialProps, ...stateToProps, ...dispatchToProps };
      return <Component {...props} />;
    };
  };
};

export default connect;
