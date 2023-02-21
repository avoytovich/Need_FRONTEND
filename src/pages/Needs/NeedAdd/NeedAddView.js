import React from 'react';
import { Typography, Box, TextField, Divider, Button } from '@mui/material';
import { toast } from 'react-toastify';

import { wrapRequest } from 'utils/api';
import { API, PER_PAGE, text } from 'helper/constants';

import colors from 'helper/colors.sass';

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
  errors,
  dispatchError,
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

  const handleTitle = (value) => {
    setTitle(value);
    if (!value) {
      dispatchError({ type: 'TITLE', payload: true });
    } else {
      dispatchError({ type: 'TITLE', payload: false });
    }
  };

  const handleAbilityToPay = (value) => {
    setAbilityToPay(value);
    if (!value) {
      dispatchError({ type: 'ABILITY_TO_PAY', payload: true });
    } else {
      dispatchError({ type: 'ABILITY_TO_PAY', payload: false });
    }
  };

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
    if (!title || !abilityToPay || !description) {
      !title && dispatchError({ type: 'TITLE', payload: true });
      !abilityToPay && dispatchError({ type: 'ABILITY_TO_PAY', payload: true });
      !description && dispatchError({ type: 'DESCRIPTION', payload: true });
      return;
    }
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
            error={errors.abilityToPay}
            helperText={errors.abilityToPay && 'Please fill out this field'}
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
