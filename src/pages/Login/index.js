import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Grid,
  TextField,
  Button,
  Stack,
} from '@mui/material';

import connect from './../../utils/connectFunction';
import action from './../../utils/actions';
import { withLayout } from './../../hocs'
import { API } from '../../helper/constants';
import { wrapRequest } from '../../utils/api';
import CustomizeIcon from './../../utils/customizeIcon';

import paddington from './../../assets/images/paddington.svg';

import './login.sass';

const Login = props => {
  // console.log('props Login', props);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const inputFields = [
    {
      label: 'email',
      type: 'email',
      placeholder: 'your@email.com',
    },
    {
      label: 'password',
      type: 'password',
      placeholder: 'your password',
    },
  ];

  const handleChange = (value, label) => {
    switch (label) {
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    default:
      break;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const payload = {
      email,
      password,
    };
    const loginUser = await wrapRequest({
      method: 'POST',
      url: `${API.URL}:${API.PORT}/login`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    });
    const { data: { token } } = loginUser;
    const { data: { userId } } = loginUser;
    if (token && userId) {
      props.dispatchSaveUserId('saveUserId', userId);
      localStorage.setItem('token', JSON.stringify(token));
      navigate('/user/dashboard');
    } else {
      console.log('Something went wrong...with login');
    }
  };

  return (
    <div className="wrapper-landing-login">
      <Grid
        container
        spacing={0}
        justify="center"
        className="container-landing-login"
      >
        <Grid item xs={6} sm={6} >
          {/* <div className="landing-about">
            <Typography className="landing-about-content">
              Application allows you to make request for offers. Don't spend
              time on searching! Wait on proposals and choose the best one.
            </Typography>
          </div> */}
          <CustomizeIcon 
            className='login-image'
            source={paddington}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <div className="landing-login">
            <form onSubmit={handleSubmit}>
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  width: 250,
                  borderRadius: 1,
                  padding: 1
                }}
              >
                {inputFields.map((each, id) => (
                  <TextField
                    key={id}
                    id={each.label}
                    name={each.label}
                    label={each.label.toUpperCase()}
                    placeholder={each.placeholder}
                    inputProps={{
                      type: each.type,
                      style: {
                        color: '#1876d2'
                      }
                    }}
                    onChange={e => handleChange(e.target.value, each.label)}
                    style={{
                      marginBottom: '5px',
                      borderRadius: '5px',
                      backgroundColor: '#ffffff',
                    }}
                    fullWidth
                  />
                ))}
                <Button type="submit" variant="contained" color="primary">
                  Log In / Sign Up
                </Button>
              </Stack>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return { store: state };
};

const mapDispatchToProps = dispatch => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchSaveUserId: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLayout(Login));
