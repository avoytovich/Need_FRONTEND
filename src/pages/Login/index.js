import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Stack } from '@mui/material';
import { toast } from 'react-toastify';

import connect from 'utils/connectFunction';
import action from 'utils/actions';
import { withLayout } from 'hocs';
import { API, text } from 'helper/constants';
import { wrapRequest } from 'utils/api';
import CustomizeIcon from 'utils/customizeIcon';

import logo from 'assets/images/logo.svg';

import colors from 'helper/colors.sass';
import './login.sass';

const Login = (props) => {
  // console.log('props Login', props);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const {
    pages: {
      login: { LOG_IN_SIGN_UP },
    },
  } = text;

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email,
      password,
    };
    wrapRequest({
      method: 'POST',
      url: `${API.URL[process.env.NODE_ENV]}/login`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(({ data: { message, token, userId } }) => {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (token && userId) {
          props.dispatchSaveUserId('saveUserId', userId);
          localStorage.setItem('token', JSON.stringify(token));
          setRefresh(true);
        }
      })
      .catch((err) => {
        console.log('err', err);
        toast.warning('Something went wrong...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    if (refresh) {
      navigate('/dashboard');
    }
  }, [refresh]);

  return (
    <div className="wrapper-landing-login">
      <Grid
        container
        spacing={0}
        justify="center"
        className="container-landing-login"
      >
        <Grid item xs={6} sm={6}>
          <CustomizeIcon className="login-image" source={logo} />
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
                  padding: 1,
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
                        color: colors['blue-light'],
                      },
                    }}
                    onChange={(e) => handleChange(e.target.value, each.label)}
                    style={{
                      marginBottom: '5px',
                      borderRadius: '5px',
                      backgroundColor: colors['white'],
                    }}
                    fullWidth
                  />
                ))}
                <Button type="submit" variant="contained" color="primary">
                  {LOG_IN_SIGN_UP}
                </Button>
              </Stack>
            </form>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withLayout(Login));
