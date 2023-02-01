import React from 'react';

import { Typography, Box, TextField, Divider, Button } from '@mui/material';

import colors from './../../../helper/colors.sass';

import './need_add.sass';

const NeedAddView = ({ title, setTitle, abilityToPay, setAbilityToPay }) => {
  const handleTitle = (value) => {
    setTitle(value);
  };

  const handleAbilityToPay = (value) => {
    setAbilityToPay(value);
  };

  return (
    <Box className="modal-create-need">
      <Typography textAlign="left">CREATING NEED</Typography>
      <Divider className="divider-create-need" />
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
          // defaultValue={description}
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
    </Box>
  );
};

export default NeedAddView;
