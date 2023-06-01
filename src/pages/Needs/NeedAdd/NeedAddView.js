import React from 'react';
import { Typography, Box, TextField, Divider, Button } from '@mui/material';
import { toast } from 'react-toastify';

import { wrapRequest } from 'utils/api';
import { API, PER_PAGE, text } from 'helper/constants';

import colors from 'helper/colors.sass';

import './need_add.sass';

const NeedAddView = ({
  handleClose,
  page,
  setPage,
  setRefresh,
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

  const handleAbilityToPay = (e) => {
    e.stopPropagation();
    if (e.target.value && !isNaN(e.target.value)) {
      dispatchError({ type: 'ABILITY_TO_PAY', payload: false });
      setAbilityToPay(e.target.value);
    } else if (e.target.value === '') {
      dispatchError({ type: 'ABILITY_TO_PAY', payload: true });
      setAbilityToPay(e.target.value);
    } else {
      dispatchError({ type: 'ABILITY_TO_PAY', payload: true });
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

    const resPage = Number.isInteger(totalItems / PER_PAGE)
      ? totalItems / PER_PAGE + 1
      : Math.ceil(totalItems / PER_PAGE);

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
        if (page !== resPage) {
          setPage(resPage);
        } else {
          setRefresh((p) => p + 1);
        }
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
