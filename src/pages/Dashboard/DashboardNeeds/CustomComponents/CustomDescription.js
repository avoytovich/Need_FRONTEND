import React from 'react';

import { TextField } from '@mui/material';

import { text } from 'helper/constants';

const CustomDescription = ({
  myRef,
  description,
  handleUpdDescription,
  errors,
}) => {
  const {
    pages: {
      needsDetails: { DESCRIPTION },
    },
  } = text;

  return (
    <TextField
      inputRef={myRef}
      id="outlined-multiline-static"
      label={DESCRIPTION}
      fullWidth
      multiline
      rows={5}
      value={description}
      onChange={handleUpdDescription}
      error={errors.description}
      helperText={errors.description && 'Please fill out description'}
    />
  );
};

export default CustomDescription;
