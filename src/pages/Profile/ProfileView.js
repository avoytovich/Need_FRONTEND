import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Badge,
  TextField,
  Tooltip,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { text, API } from 'helper/constants';
import { wrapRequest } from 'utils/api';
import connect from 'utils/connectFunction';
import renderAvatar from 'utils/renderAvatar';
import action from 'utils/actions';
import { withLayout } from 'hocs';

import colors from 'helper/colors.sass';
import './profile.sass';

const ProfileView = ({ store, dispatchSaveUser }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [nickname, setNickname] = useState(store.user?.nickname);
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(
    renderAvatar(store.user?.photo?.data),
  );

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    setSelectedAvatar(URL.createObjectURL(file));
    handleCloseDialog();
  };

  const saveWithoutAvatar = () => {
    let url = `${API.URL[process.env.NODE_ENV]}/user/${store.userId}/update`;
    wrapRequest({
      method: 'PUT',
      url,
      mode: 'cors',
      cache: 'default',
      data: { nickname },
    }).then((data) => {
      toast.success(data.message || 'nickname was successfully updated', {
        position: toast.POSITION.TOP_RIGHT,
      });
      wrapRequest({
        method: 'GET',
        url: `${API.URL[process.env.NODE_ENV]}/user/${store.userId}`,
        mode: 'cors',
        cache: 'default',
      })
        .then(({ data: { user } }) => {
          dispatchSaveUser('saveUser', user);
        })
        .catch((err) =>
          toast.error(err, {
            position: toast.POSITION.TOP_RIGHT,
          }),
        );
    });
  };

  const saveWithAvatar = () => {
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    wrapRequest({
      method: 'POST',
      url: `${API.URL[process.env.NODE_ENV]}/upload-avatar`,
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': JSON.parse(localStorage.getItem('token')),
        'Access-Control-Allow-Origin': '*', // temp
      },
      data: formData,
    })
      .then((data) => {
        toast.success(data.message || 'successfully add new avatar', {
          position: toast.POSITION.TOP_RIGHT,
        });
        wrapRequest({
          method: 'GET',
          url: `${API.URL[process.env.NODE_ENV]}/user/${store.userId}`,
          mode: 'cors',
          cache: 'default',
        })
          .then(({ data: { user } }) => {
            dispatchSaveUser('saveUser', user);
          })
          .catch((err) =>
            toast.error(err, {
              position: toast.POSITION.TOP_RIGHT,
            }),
          );
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setSelectedFile(null);
      });
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setNickname(store.user?.nickname);
    setSelectedAvatar(renderAvatar(store.user?.photo?.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile && nickname === store.user?.nickname) {
      saveWithAvatar();
    } else if (!selectedFile && nickname !== store.user?.nickname) {
      saveWithoutAvatar();
    } else if (selectedFile && nickname !== store.user?.nickname) {
      saveWithAvatar();
      saveWithoutAvatar();
    }
  };

  const {
    pages: {
      profile: { SAVE, RESET },
    },
  } = text;

  return (
    <div className="wrapper-profile">
      <Grid container spacing={0} className="container-profile">
        <Grid item xs={1} sm={1} />
        <Grid item xs={2} sm={2}>
          <Box m={2}>
            <Typography variant="font_24_serif"></Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} display="flex" justifyContent="center">
          <div className="container-form">
            <form onSubmit={handleSubmit}>
              <Box className="form-managment">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Box ml={1}>
                      <Tooltip
                        disableInteractive
                        arrow
                        title="upload"
                        placement="top"
                      >
                        <IconButton
                          className="upload-button"
                          disableRipple
                          onClick={handleOpenDialog}
                          edge="start"
                          aria-label="refresh"
                          size="large"
                        >
                          <PhotoCamera color="primary" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                >
                  <Avatar src={selectedAvatar} className="avatar" />
                </Badge>
                <Dialog open={open} onClose={handleCloseDialog}>
                  <DialogTitle>Upload Avatar</DialogTitle>
                  <DialogContent>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
                <Box m={1} className="managment-panel">
                  <Button
                    variant="outlined"
                    size="small"
                    style={{
                      margin: '5px',
                      width: '100px',
                    }}
                    onClick={handleReset}
                  >
                    {RESET}
                  </Button>
                  <Button
                    type="submit"
                    color="blue_light"
                    size="small"
                    variant="contained"
                    style={{
                      margin: '5px',
                      width: '100px',
                    }}
                    disabled={
                      selectedFile === null && nickname === store.user?.nickname
                    }
                  >
                    {SAVE}
                  </Button>
                </Box>
              </Box>
              <Box mt={2}>
                <TextField
                  label="NICKNAME"
                  placeholder="here your nickname"
                  inputProps={{
                    type: 'text',
                    style: {
                      color: colors['blue-light'],
                    },
                  }}
                  value={nickname || ''}
                  onChange={(e) => setNickname(e.target.value)}
                  style={{
                    marginBottom: '5px',
                    borderRadius: '5px',
                    backgroundColor: colors['white'],
                  }}
                  fullWidth
                />
              </Box>
            </form>
          </div>
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          display="flex"
          justifyContent="flex-end"
        ></Grid>
        <Grid item xs={1} sm={1} />
        <Grid item xs={8} sm={8} className="container-needs-content"></Grid>
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
    dispatchSaveUser: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLayout(ProfileView));
