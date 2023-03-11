import React, { useState } from 'react';
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

import Offers from './Offers';
import { text, API } from 'helper/constants';
import { wrapRequest } from 'utils/api';

import colors from 'helper/colors.sass';

const NeedDetailsView = ({
  data: { owner_id, title, description, createdAt, status, ability_to_pay },
  currentUserId,
}) => {
  const [updTitle, setUpdTitle] = useState(title);
  const [updAbility, setUpdAbility] = useState(ability_to_pay);
  const [updDescription, setUpdDescription] = useState(description);

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
      case 'in progress':
        return colors['blue-light'];
      case 'actual':
        return colors['green-light'];
      case 'not actual':
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
  };

  const handleTitle = (e) => {
    e.stopPropagation();
    setUpdTitle(e.target.value);
  };

  const handleAbility = (e) => {
    e.stopPropagation();
    setUpdAbility(e.target.value);
  };

  const handleDescription = (e) => {
    e.stopPropagation();
    setUpdDescription(e.target.value);
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
              disabled={owner_id !== currentUserId}
              fullWidth
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
                inputProps={{
                  type: 'number',
                }}
                value={updAbility}
                onChange={handleAbility}
                disabled={owner_id !== currentUserId}
                fullWidth
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
              disabled={owner_id !== currentUserId}
              fullWidth
              multiline
              rows={5}
              value={updDescription}
              onChange={handleDescription}
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
            <Offers isOwnerNeed={owner_id === currentUserId} />
          </Stack>
        </Grid>
        <Grid item xs={1} sm={1} />
      </Grid>
    </div>
  );
};

export default NeedDetailsView;
