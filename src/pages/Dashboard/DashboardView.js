import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

import CustomizeIcon from 'utils/customizeIcon';
import imageNeed from 'assets/images/logo.svg';
import imageOffer from 'assets/images/offer.jpg';

import './dashboard.sass';

const DashboardView = ({ handleClickNeed, handleClickOffer }) => {
  return (
    <div className="wrapper-dashboard">
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        style={{ height: '80vh' }}
      >
        <Grid item xs={11} sm={5} md={4}>
          <Box className="dashboard-card" onClick={handleClickNeed}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CardContent sx={{ padding: '20px 20px 0px' }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ textAlign: 'center' }}
                >
                  Manage your
                </Typography>
              </CardContent>
              <CustomizeIcon
                className="icon-customize"
                width="150px"
                height="150px"
                source={imageNeed}
              />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={1} sm={1} md={1}></Grid>
        <Grid item xs={11} sm={5} md={4}>
          <Box className="dashboard-card" onClick={handleClickOffer}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CardContent sx={{ padding: '20px 20px 0px' }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ textAlign: 'center' }}
                >
                  Manage your
                </Typography>
              </CardContent>
              <CustomizeIcon
                className="icon-customize"
                width="150px"
                height="150px"
                source={imageOffer}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardView;
