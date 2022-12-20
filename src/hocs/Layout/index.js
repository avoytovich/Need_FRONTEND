import React from 'react';

import { Header, Footer } from './../../components';

import './layout.sass';

const withLayout = (Component) => {

  return props => {
    return (
      <React.Fragment>
        <Header ofComponent={Component.name}/>
        <div className="container-layout">
          <Component {...props} />
        </div>
        <Footer />
      </React.Fragment>
    )
  }
};

export default withLayout;
