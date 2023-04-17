import React from 'react';

import { Header, Footer } from 'components';

import './layout.sass';

const withLayout = (Component) => {
  return (props) => {
    return (
      <React.Fragment>
        <div className="container-layout">
          <Header />
          <Component {...props} />
          <Footer />
        </div>
      </React.Fragment>
    );
  };
};

export default withLayout;
