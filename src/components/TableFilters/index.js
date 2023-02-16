import React from 'react';
import { Button, Box, Stack } from '@mui/material';

import { text } from 'helper/constants';

import colors from 'helper/colors.sass';

const TableFilters = ({
  onClose,
  actual,
  setActual,
  noActual,
  setNoActual,
  inProgress,
  setInProgress,
}) => {
  const {
    components: {
      tableFilters: { ACTUAL, NOT_ACTUAL, IN_PROGRESS },
    },
  } = text;

  return (
    <Stack
      sx={{
        width: 250,
        margin: 1,
        borderRadius: 1,
        backgroundColor: colors['black-dark'],
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
      }}
    >
      <Box m={1}>
        <Button
          color="green_light"
          variant="contained"
          style={{
            width: '200px',
            border: actual ? `2px ${colors['white']} solid` : null,
            borderRadius: actual ? '5px' : null,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setActual((s) => !s);
          }}
        >
          {ACTUAL}
        </Button>
      </Box>
      <Box m={1}>
        <Button
          color="red_light"
          variant="contained"
          style={{
            width: '200px',
            border: noActual ? `2px ${colors['white']} solid` : null,
            borderRadius: noActual ? '5px' : null,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setNoActual((s) => !s);
          }}
        >
          {NOT_ACTUAL}
        </Button>
      </Box>
      <Box m={1}>
        <Button
          color="blue_light"
          variant="contained"
          style={{
            width: '200px',
            border: inProgress ? `2px ${colors['white']} solid` : null,
            borderRadius: inProgress ? '5px' : null,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setInProgress((s) => !s);
          }}
        >
          {IN_PROGRESS}
        </Button>
      </Box>
    </Stack>
  );
};

export default TableFilters;
