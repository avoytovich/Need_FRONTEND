import React from 'react';
import { Typography, Box, TextField, Divider, Button } from '@mui/material';
import { toast } from 'react-toastify';

import { wrapRequest } from './../../../utils/api';
import { API, PER_PAGE } from './../../../helper/constants';

import colors from './../../../helper/colors.sass';

import './need_add.sass';

const NeedAddView = ({
  handleClose,
  setPage,
  totalItems,
  title,
  setTitle,
  abilityToPay,
  setAbilityToPay,
  description,
  setDescription,
}) => {
  const handleTitle = (value) => {
    setTitle(value);
  };

  const handleAbilityToPay = (value) => {
    setAbilityToPay(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      title,
      ability_to_pay: abilityToPay,
      description,
    };
    await wrapRequest({
      method: 'POST',
      url: `${API.URL}:${API.PORT}/needs/create`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(({ data: { message } }) => {
        handleClose();
        setPage(
          Number.isInteger(totalItems / PER_PAGE)
            ? totalItems / PER_PAGE + 1
            : Math.ceil(totalItems / PER_PAGE),
        );
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
      <Typography textAlign="left">CREATING NEED</Typography>
      <Divider className="divider-create-need" />
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>title:</Typography>
          <TextField
            placeholder="type title"
            size="small"
            inputProps={{
              type: 'text',
              style: {
                color: colors['blue-light'],
              },
            }}
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
            style={{
              margin: '10px',
              borderRadius: '5px',
              backgroundColor: colors['white'],
            }}
            fullWidth
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>pay for:</Typography>
          <TextField
            placeholder="type how much are you ready to pay for?"
            size="small"
            inputProps={{
              type: 'number',
              style: {
                color: colors['blue-light'],
              },
            }}
            value={abilityToPay}
            onChange={(e) => handleAbilityToPay(e.target.value)}
            style={{
              margin: '10px',
              borderRadius: '5px',
              backgroundColor: colors['white'],
            }}
            fullWidth
          />
        </Box>
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

export default NeedAddView;
