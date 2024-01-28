import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  Stack,
  TextField,
  Modal,
} from '@mui/material';

import Offers from 'pages/Offers';
import { text } from 'helper/constants';

import colors from 'helper/colors.sass';

const NeedDetailsView = ({
  data,
  data: { owner_id, createdAt, status },
  currentUserId,
  updTitle,
  handleTitle,
  updAbility,
  handleAbility,
  updDescription,
  handleDescription,
  handleDelete,
  handleSave,
  handleReset,
  errors,
  refreshNeed,
  setRefreshNeed,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    pages: {
      needsDetails: {
        TITLE,
        STATUS,
        ABILITY_TO_PAY,
        DESCRIPTION,
        SAVE,
        RESET,
        DELETE,
        CONFIRMATION_DELETE,
        YES,
        NO,
      },
    },
  } = text;

  const handleDate = (date) => new Date(date).toLocaleDateString();

  const handleBackground = (status) => {
    switch (status) {
      case 'in_progress':
        return colors['blue-light'];
      case 'actual':
        return colors['green-light'];
      case 'not_actual':
        return colors['red-light'];
      default:
        break;
    }
  };

  return (
    <div className="wrapper-need-details">
      <Grid container spacing={0} className="container-need-details">
        <Grid item xs={1} sm={1} />
        <Grid item xs={3} sm={3} display="flex" justifyContent="center">
          <Stack
            sx={{
              margin: '40px 8px 8px 8px',
              width: '100%',
              padding: 1,
              backgroundColor: colors['white'],
              borderRadius: 1,
            }}
          >
            <Typography textAlign="center" variant="font_12_roboto">
              {handleDate(createdAt)}
            </Typography>
            <TextField
              label={TITLE}
              size="small"
              value={updTitle}
              onChange={handleTitle}
              disabled={owner_id !== currentUserId || status === 'in_progress'}
              fullWidth
              error={errors.title}
              helperText={errors.title && 'Please fill out title'}
            />
            <Box
              sx={{
                margin: '2px 16px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '15px',
              }}
            >
              <Box>
                <Typography variant="font_14_roboto">{STATUS}</Typography>
              </Box>
              <Box
                sx={{
                  textAlign: 'right',
                  padding: '0px 5px',
                  border: 1,
                  borderRadius: '5px',
                  backgroundColor: handleBackground(status),
                }}
              >
                {status}
              </Box>
            </Box>
            <Box
              sx={{
                margin: '20px 0px 0px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors['white'],
                borderRadius: 1,
              }}
            >
              <TextField
                label={ABILITY_TO_PAY}
                size="small"
                value={updAbility}
                onChange={handleAbility}
                disabled={
                  owner_id !== currentUserId || status === 'in_progress'
                }
                fullWidth
                error={errors.abilityToPay}
                helperText={errors.abilityToPay && 'Please type number'}
              />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={7} sm={7} display="flex" justifyContent="flex-start">
          <Stack
            sx={{
              margin: '40px 8px 8px 8px',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
              backgroundColor: colors['white'],
              borderRadius: 1,
            }}
          >
            <TextField
              id="outlined-multiline-static"
              label={DESCRIPTION}
              disabled={owner_id !== currentUserId || status === 'in_progress'}
              fullWidth
              multiline
              rows={5}
              value={updDescription}
              onChange={handleDescription}
              error={errors.description}
              helperText={errors.description && 'Please fill out description'}
            />
          </Stack>
          {owner_id === currentUserId && (
            <Box
              mt={5}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box ml={1} mb={1}>
                <Button
                  color="red_light"
                  size="small"
                  variant="contained"
                  style={{
                    width: '100px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                >
                  {DELETE}
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="modal-create">
                    <Box textAlign="center">
                      <Typography>{CONFIRMATION_DELETE}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Box m={3}>
                        <Button
                          color="blue_light"
                          size="small"
                          variant="contained"
                          style={{
                            width: '100px',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                            handleDelete();
                          }}
                        >
                          {YES}
                        </Button>
                      </Box>
                      <Box m={3}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{
                            width: '100px',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                          }}
                        >
                          {NO}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Modal>
              </Box>
              <Box m={1}>
                <Button
                  color="blue_light"
                  size="small"
                  variant="contained"
                  style={{
                    width: '100px',
                  }}
                  onClick={handleSave}
                  disabled={
                    errors.title ||
                    errors.abilityToPay ||
                    errors.description ||
                    status === 'in_progress'
                  }
                >
                  {SAVE}
                </Button>
              </Box>
              <Box m={1}>
                <Button
                  variant="outlined"
                  size="small"
                  style={{
                    width: '100px',
                  }}
                  onClick={handleReset}
                >
                  {RESET}
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={1} sm={1} />
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10}>
          <Stack
            sx={{
              margin: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
              backgroundColor: colors['white'],
              borderRadius: 1,
            }}
          >
            <Offers
              isOwnerNeed={owner_id === currentUserId}
              need={data}
              refreshNeed={refreshNeed}
              setRefreshNeed={setRefreshNeed}
            />
          </Stack>
        </Grid>
        <Grid item xs={1} sm={1} />
      </Grid>
    </div>
  );
};

export default NeedDetailsView;
