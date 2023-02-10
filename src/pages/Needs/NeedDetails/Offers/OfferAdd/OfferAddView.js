import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, TextField, Divider, Button } from '@mui/material';
import { toast } from 'react-toastify';

import { wrapRequest } from './../../../../../utils/api';
import { API } from './../../../../../helper/constants';

import './offer_add.sass';

const OfferAddView = ({ handleClose, description, setDescription }) => {
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      description,
    };
    await wrapRequest({
      method: 'POST',
      url: `${API.URL}:${API.PORT}/offer/create?needId=${id}`,
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
      <Typography textAlign="left">CREATING OFFER</Typography>
      <Divider className="divider-create-offer" />
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            margin: '10px 10px 10px 0px',
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label="Description"
            fullWidth
            multiline
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
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
            >
              SAVE
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
              }}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default OfferAddView;
