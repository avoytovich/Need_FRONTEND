import React from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Autocomplete,
  TextField,
  Stack,
  Paper,
  Divider,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import connect from './../../utils/connectFunction';
import checkAuth from './../../utils/checkAuth';
import CustomizeIcon from './../../utils/customizeIcon';
import { links } from './constants';

import imageLogo from './../../assets/images/logo.svg';
import imageAvatar from './../../assets/images/avatar.svg';

import './header.sass';

const Header = props => {

  // console.log('Header props', props);
  const { ofComponent } = props;
  
  const navigate = useNavigate();

  const handleLogOut = () => localStorage.setItem('token', JSON.stringify(null));
  
  const isAuth = checkAuth(props.store.userId);

  const property = isAuth ? 'withAuth' : 'withoutAuth';

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
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
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem style={{backgroundColor: '#f14238'}} />}
              spacing={1}
            >
              {
                links(ofComponent)[property].map(item => {
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
            </Stack>
          </Grid>
          <Grid item xs={3} sm={3} className="container-search">
            <Stack 
              spacing={2}
              sx={{
                width: 150,
                backgroundColor: '#d7ba32',
                borderRadius: 1,
                padding: 1
              }}>
              <Autocomplete
                freeSolo
                className="search-input"
                size="small"
                disableClearable
                PaperComponent={({ children }) => (
                  <Paper style={{ marginBottom: 10 }}>{children}</Paper>
                )}
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search NEED"
                    variant="outlined"
                    style={{
                      backgroundColor: '#ffffff',
                    }}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                      style: {
                        color: '#1876d2'
                      }
                    }}
                  />
                )}
              />
            </Stack>
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
