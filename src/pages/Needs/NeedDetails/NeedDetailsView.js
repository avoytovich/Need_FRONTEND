import React, { useState, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import { text, API } from 'helper/constants';
import { wrapRequest } from 'utils/api';

import colors from 'helper/colors.sass';

const NeedDetailsView = ({
  data,
  data: { owner_id, title, description, createdAt, status, ability_to_pay },
  currentUserId,
  refreshNeed,
  setRefreshNeed,
}) => {
  const [updTitle, setUpdTitle] = useState(title);
  const [updAbility, setUpdAbility] = useState(ability_to_pay);
  const [updDescription, setUpdDescription] = useState(description);

  const reducerError = (state, action) => {
    switch (action.type) {
      case 'TITLE_ERROR':
        return { ...state, title: action.payload };
      case 'ABILITY_TO_PAY_ERROR':
        return { ...state, abilityToPay: action.payload };
      case 'DESCRIPTION_ERROR':
        return { ...state, description: action.payload };
      case 'ALL_ERROR':
        return {
          ...state,
          title: action.payload,
          abilityToPay: action.payload,
          description: action.payload,
        };
      default:
        throw new Error();
    }
  };

  const [errors, dispatchError] = useReducer(reducerError, {
    title: false,
    abilityToPay: false,
    description: false,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleDelete = () => {
    wrapRequest({
      method: 'DELETE',
      url: `${API.URL}:${API.PORT}/needs/${id}/delete`,
      mode: 'cors',
      cache: 'default',
    })
      .then(() => {
        handleClose();
        navigate(-1);
        toast.success(`Need - ${title} was successfully deleted`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const payload = {
      title: updTitle,
      ability_to_pay: updAbility,
      description: updDescription,
    };
    wrapRequest({
      method: 'PUT',
      url: `${API.URL}:${API.PORT}/needs/${id}/update`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(() => {
        toast.success(`Need - ${title} was successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setUpdTitle(title);
    setUpdAbility(ability_to_pay);
    setUpdDescription(description);
    dispatchError({ type: 'ALL_ERROR', payload: false });
  };

  const handleTitle = (e) => {
    e.stopPropagation();
    if (e.target.value) {
      dispatchError({ type: 'TITLE_ERROR', payload: false });
      setUpdTitle(e.target.value);
    } else if (e.target.value === '') {
      dispatchError({ type: 'TITLE_ERROR', payload: true });
      setUpdTitle(e.target.value);
    } else {
      dispatchError({ type: 'TITLE_ERROR', payload: true });
    }
  };

  const handleAbility = (e) => {
    e.stopPropagation();
    if (e.target.value && !isNaN(e.target.value)) {
      dispatchError({ type: 'ABILITY_TO_PAY_ERROR', payload: false });
      setUpdAbility(e.target.value);
    } else if (e.target.value === '') {
      dispatchError({ type: 'ABILITY_TO_PAY_ERROR', payload: true });
      setUpdAbility(e.target.value);
    } else {
      dispatchError({ type: 'ABILITY_TO_PAY_ERROR', payload: true });
    }
  };

  const handleDescription = (e) => {
    e.stopPropagation();
    if (e.target.value !== '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: false });
      setUpdDescription(e.target.value);
    } else if (e.target.value === '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
      setUpdDescription(e.target.value);
    } else {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
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
                          onClick={handleDelete}
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
