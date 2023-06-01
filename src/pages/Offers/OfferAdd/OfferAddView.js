import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, TextField, Divider, Button } from '@mui/material';
import { toast } from 'react-toastify';

import { wrapRequest } from 'utils/api';
import { API, text } from 'helper/constants';

import './offer_add.sass';

const OfferAddView = ({
  handleClose,
  description,
  setDescription,
  errors,
  dispatchError,
}) => {
  const { id } = useParams();

  const {
    pages: {
      offerAdd: { CREATING_OFFER, DESCRIPTION, SAVE, CANCEL },
    },
  } = text;

  const handleDescription = (value) => {
    setDescription(value);
    if (!value) {
      dispatchError({ type: 'DESCRIPTION', payload: true });
    } else {
      dispatchError({ type: 'DESCRIPTION', payload: false });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!description) {
      !description && dispatchError({ type: 'DESCRIPTION', payload: true });
      return;
    }
    const payload = {
      description,
    };
    await wrapRequest({
      method: 'POST',
      url: `${API.URL[process.env.NODE_ENV]}/offer/create?needId=${id}`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(({ data: { message } }) => {
        handleClose();
        toast.success(message, {
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
    <Box className="modal-create">
      <Typography textAlign="left">{CREATING_OFFER}</Typography>
      <Divider className="divider-create-offer" />
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            margin: '10px 10px 10px 0px',
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label={DESCRIPTION}
            fullWidth
            multiline
            rows={3}
            onChange={(e) => handleDescription(e.target.value)}
            error={errors.description}
            helperText={errors.description && 'Please fill out this field'}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Box m={2}>
            <Button
              color="blue_light"
              variant="contained"
              style={{
                width: '100px',
              }}
              type="submit"
              onClick={(e) => {
                e.stopPropagation();
              }}
              disabled={errors.description}
            >
              {SAVE}
            </Button>
          </Box>
          <Box m={2}>
            <Button
              variant="outlined"
              style={{
                width: '100px',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              {CANCEL}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default OfferAddView;
