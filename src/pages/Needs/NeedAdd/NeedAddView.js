import React from 'react';
import { Typography, Box, TextField, Divider, Button } from '@mui/material';

import { text } from 'helper/constants';

import colors from 'helper/colors.sass';

import './need_add.sass';

const NeedAddView = ({
  handleClose,
  title,
  handleTitle,
  abilityToPay,
  handleAbilityToPay,
  handleDescription,
  handleSubmit,
  errors,
}) => {
  const {
    pages: {
      needAdd: {
        CREATING_NEED,
        TITLE,
        PAY_FOR,
        PROPOSE_TO_PAY_MESSAGE,
        DESCRIPTION,
        SAVE,
        CANCEL,
      },
    },
  } = text;

  return (
    <Box className="modal-create">
      <Typography textAlign="left">{CREATING_NEED}</Typography>
      <Divider className="divider-create-need" />
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Typography>{TITLE}</Typography>
          <TextField
            placeholder="type title"
            size="small"
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
            style={{
              margin: '10px',
              borderRadius: '5px',
              backgroundColor: colors['white'],
            }}
            fullWidth
            error={errors.title}
            helperText={errors.title && 'Please fill out this field'}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Typography style={{ whiteSpace: 'nowrap' }}>{PAY_FOR}</Typography>
          <TextField
            placeholder={PROPOSE_TO_PAY_MESSAGE}
            size="small"
            value={abilityToPay}
            onChange={(e) => handleAbilityToPay(e)}
            style={{
              margin: '10px',
              borderRadius: '5px',
              backgroundColor: colors['white'],
            }}
            fullWidth
            error={errors.abilityToPay}
            helperText={errors.abilityToPay && 'Please type number'}
          />
        </Box>
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
              disabled={
                errors.title || errors.abilityToPay || errors.description
              }
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

export default NeedAddView;
