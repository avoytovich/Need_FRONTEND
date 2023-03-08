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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    pages: {
      needsDetails: {
        STATUS,
        ABILITY_TO_PAY,
        DESCRIPTION,
        SAVE,
        CANCEL,
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
            <Typography textAlign="center" variant="font_24_serif">
              {title}
            </Typography>
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
                margin: '2px 16px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors['white'],
                borderRadius: 1,
              }}
            >
              <Box>
                <Typography variant="font_14_roboto">
                  {ABILITY_TO_PAY}
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: 'right',
                }}
              >
                {ability_to_pay}
              </Box>
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
              fullWidth
              multiline
              rows={3}
              defaultValue={description}
            />
          </Stack>
          {owner_id === currentUserId && (
            <Box
              mt={5}
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
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
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {CANCEL}
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
