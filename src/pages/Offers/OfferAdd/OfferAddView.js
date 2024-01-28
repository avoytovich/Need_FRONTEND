import React from 'react';
import { Typography, Box, TextField, Divider, Button } from '@mui/material';

import { text } from 'helper/constants';

import './offer_add.sass';

const OfferAddView = ({
  handleDescription,
  handleSubmit,
  handleClose,
  errors,
}) => {
  const {
    pages: {
      offerAdd: { CREATING_OFFER, DESCRIPTION, SAVE, CANCEL },
    },
  } = text;

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
