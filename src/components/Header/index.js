import React from 'react';
import {
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import connect from './../../utils/connectFunction';
import checkAuth from './../../utils/checkAuth';
import CustomizeIcon from './../../utils/customizeIcon';

import imageLogo from './../../assets/images/logo.svg';
import imageAvatar from './../../assets/images/avatar.svg';

import './header.sass';

const Header = props => {

  // console.log('Header props', props);
  const { ofComponent } = props;
  
  const navigate = useNavigate();

  const handleLogOut = () => localStorage.setItem('token', JSON.stringify(null));
  
  const isAuth = checkAuth(props.store.userId);

  const links = [
    {
      id: 1,
      title: 'HOME',
      route: '/',
    },
    {
      id: 2,
      title: isAuth ? 'DASHBOARD' : null,
      route: isAuth ? '/dashboard' : null,
    },
    {
      id: 3,
      title: 'NEEDS',
      route: '/needs',
    },
    {
      id: 4,
      title: isAuth ? 'PROFILE' : null,
      route: isAuth ? '/profile' : null,
    },
    {
      id: 5,
      title: ofComponent === "Login" ? null : 'Log In / Sign Up',
      route: ofComponent === "Login" ? null : '/login',
    }
  ];

  const resolveOnClickLink = title => {
    switch(title) {
    case 'Log Out':
      handleLogOut();
      break;
    default:
      break;
    }
  }

  return (
    <div className="wrapper-header">
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={11} sm={11} className="container-header">
          <Grid item xs={2} sm={2} className="container-info">
            <Grid item xs={4} sm={4} className="container-info-logo">
              <CustomizeIcon 
                className='info-logo' 
                width='64px' 
                height='64px'
                source={imageLogo}
              />
            </Grid>
            <Grid item xs={8} sm={8} className="container-go-back">
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBack style={{color: 'red'}}/>
              </IconButton>
              <Typography className='info-title'>
                  BACK  
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={5} sm={5} className="container-link">
            {
              links.map(item => {
                return (
                  <Link
                    key={item.id}
                    to={item.route}
                    className='link'
                    onClick={() => resolveOnClickLink(item.title)}
                  >
                    <Typography className='link-title'>
                      {item.title}
                    </Typography>
                  </Link>
                );
              })
            }
          </Grid>
          <Grid item xs={3} sm={3} className="container-link">

          </Grid>
          <Grid item xs={2} sm={2} className="container-link">
            {
              isAuth && (
                <>
                  <CustomizeIcon 
                    className='link-avatar'
                    width='48px' 
                    height='48px'
                    source={imageAvatar}
                  />
                  <Link
                    to='/'
                    className='link'
                    onClick={() => resolveOnClickLink('Log Out')}
                  >
                    <Typography className='link-title'>
                      Log Out
                    </Typography>
                  </Link>
                </>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  return { store: state };
};

export default connect(
  mapStateToProps,
  () => {},
)(Header);
