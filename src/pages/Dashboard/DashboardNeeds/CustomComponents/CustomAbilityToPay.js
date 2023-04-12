import React from 'react';

import { TextField } from '@mui/material';

import { text } from 'helper/constants';

const CustomAbilityToPay = ({
  myRef,
  abilityToPay,
  handleUpdAbility,
  errors,
}) => {
  const {
    pages: {
      needsDetails: { ABILITY_TO_PAY },
    },
  } = text;

  return (
    <TextField
      inputRef={myRef}
      label={ABILITY_TO_PAY}
      size="small"
      value={abilityToPay}
      onChange={handleUpdAbility}
      fullWidth
      error={errors.abilityToPay}
      helperText={errors.abilityToPay && 'Please type number'}
    />
  );
};

export default CustomAbilityToPay;
