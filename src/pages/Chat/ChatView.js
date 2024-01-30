import React from 'react';
import { Box, TextField, Button } from '@mui/material';

import { text } from 'helper/constants';

import colors from 'helper/colors.sass';

const ChatView = ({ message, handleMessage, handleSendMessage, data }) => {
  const {
    pages: {
      chat: { CREATE_MESSAGE, SEND },
    },
  } = text;

  const isNeedOwner = (item) => item.indexOf('needOwner') !== -1;

  return (
    <Box className="modal-create">
      <Box
        sx={{
          border: `2px ${colors['black-dark']} solid`,
          borderRadius: '5px',
        }}
      >
        {data.chat?.messeges.map((item) => (
          <Box
            key={item}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isNeedOwner(item) ? 'flex-start' : 'flex-end',
            }}
          >
            <Box
              key={item}
              mx={8}
              my={2}
              p={4}
              sx={{
                display: 'inline-block',
                border: `2px ${colors['black-dark']} solid`,
                color: colors['white'],
                borderRadius: '5px',
                backgroundColor: isNeedOwner(item)
                  ? colors['red-light']
                  : colors['blue-light'],
              }}
            >
              {item}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        my={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box m={2}>
          <TextField
            id="outlined-multiline-static"
            label={CREATE_MESSAGE}
            multiline
            fullWidth
            rows={3}
            value={message}
            onChange={handleMessage}
          />
        </Box>
        <Box m={2}>
          <Button
            color="green_light"
            variant="contained"
            onClick={handleSendMessage}
          >
            {SEND}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatView;
