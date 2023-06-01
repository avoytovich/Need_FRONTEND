import React from 'react';

import { Grid } from '@mui/material';

import './loader.scss';

const Loader = (props) => {
  return (
    <div className="wrapper-loader">
      <Grid container spacing={0} className="container-loader">
        <Grid item xs={8} sm={8} display="flex" justifyContent="center">
          <div className="loadingio-spinner-pulse-9ju1rpd5g0n">
            <div className="ldio-ksany99v4cs">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Loader;
