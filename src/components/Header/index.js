import React from 'react';
import { Grid, Typography, IconButton, Stack, Divider } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import connect from './../../utils/connectFunction';
import action from './../../utils/actions';
import checkAuth from './../../utils/checkAuth';
import CustomizeIcon from './../../utils/customizeIcon';
import { links } from './constants';

import imageLogo from './../../assets/images/logo.svg';
import imageAvatar from './../../assets/images/avatar.svg';

import './header.sass';
import colors from './../../helper/colors.sass';

const Header = (props) => {
  // console.log('Header props', props);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.setItem('token', JSON.stringify(null));
    props.dispatchSaveUserId('saveUserId', null);
  };

  const isAuth = checkAuth(props.store.userId);

  const property = isAuth ? 'withAuth' : 'withoutAuth';

  const resolveOnClickLink = (title) => {
    switch (title) {
      case 'Log Out':
        handleLogOut();
        break;
      default:
        break;
    }
  };

  return (
    <div className="wrapper-header">
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={11} sm={11} className="container-header">
          <Grid item xs={2} sm={2} className="container-info">
            <Grid item xs={4} sm={4} className="container-info-logo">
              <CustomizeIcon
                className="info-logo"
                width="64px"
                height="64px"
                source={imageLogo}
              />
            </Grid>
            <Grid item xs={8} sm={8} className="container-go-back">
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBack style={{ color: colors['red-light'] }} />
              </IconButton>
              <Typography className="info-title">BACK</Typography>
            </Grid>
          </Grid>
          <Grid item xs={8} sm={8} className="container-link">
            <Stack
              direction="row"
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  className="divider-link"
                />
              }
              spacing={1}
            >
              {links[property].map((item) => {
                return (
                  <Link
                    key={item.id}
                    to={item.route}
                    className="link"
                    onClick={() => resolveOnClickLink(item.title)}
                  >
                    <Typography className="link-title">{item.title}</Typography>
                  </Link>
                );
              })}
            </Stack>
          </Grid>
          <Grid item xs={2} sm={2} className="container-link">
            {isAuth && (
              <>
                <CustomizeIcon
                  className="link-avatar"
                  width="48px"
                  height="48px"
                  source={imageAvatar}
                />
                <Link
                  to="/"
                  className="link"
                  onClick={() => resolveOnClickLink('Log Out')}
                >
                  <Typography className="link-title">Log Out</Typography>
                </Link>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { store: state };
};

const mapDispatchToProps = (dispatch) => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchSaveUserId: actionData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
