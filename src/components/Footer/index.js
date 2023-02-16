import React from 'react';
import { Grid, Typography } from '@mui/material';

import { text } from 'helper/constants';

import './footer.sass';

const Footer = (props) => {
  // console.log('props Footer', props);

  const {
    components: {
      footer: { COPYRIGHT },
    },
  } = text;

  return (
    <div className="wrapper-footer">
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={10} sm={10}>
          <Typography className="content">{COPYRIGHT}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
