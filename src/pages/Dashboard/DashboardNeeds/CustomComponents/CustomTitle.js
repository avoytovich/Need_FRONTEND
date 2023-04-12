import React from 'react';

import { TextField } from '@mui/material';

import { text } from 'helper/constants';

const CustomTitle = ({ myRef, title, handleUpdTitle, errors }) => {
  const {
    pages: {
      needsDetails: { TITLE },
    },
  } = text;

  return (
    <TextField
      inputRef={myRef}
      label={TITLE}
      size="small"
      value={title}
      onChange={handleUpdTitle}
      fullWidth
      error={errors.title}
      helperText={errors.title && 'Please fill out title'}
    />
  );
};

export default CustomTitle;
