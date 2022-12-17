import React from 'react';
import {
  Grid,
  Typography
} from '@mui/material';

import './footer.sass';

const Footer = props => {

  // console.log('props Footer', props);
  return (
    <div className="wrapper-footer">
      <Grid container spacing={0} justify="center">
        <Grid item xs={10} sm={10}>
          <Typography className='content'>
            Copyright © 2021 | Created by Andrii Voitovych
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
