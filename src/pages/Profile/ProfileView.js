import React from 'react';
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

import { text } from 'helper/constants';

import colors from 'helper/colors.sass';
import './profile.sass';

const ProfileView = ({
  open,
  handleOpenDialog,
  handleCloseDialog,
  nickname,
  setNickname,
  isDisabled,
  handleReset,
  handleSubmit,
  handleAvatarChange,
  selectedAvatar,
}) => {
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
                    disabled={isDisabled}
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

export default ProfileView;
