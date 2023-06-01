import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Box, TextField, Button } from '@mui/material';

import { text, API } from 'helper/constants';
import { wrapRequest } from 'utils/api';

import colors from 'helper/colors.sass';

const ChatView = ({
  owner,
  needId,
  offerId,
  data,
  refreshChat,
  setRefreshChat,
}) => {
  // console.log('data', data);
  const [message, setMessage] = useState('');

  const {
    pages: {
      chat: { CREATE_MESSAGE, SEND },
    },
  } = text;

  const handleMessage = (e) => setMessage(e.target.value);

  const handleSendMessage = () => {
    let url = `${API.URL}:${API.PORT}/chat/create_update?needId=${needId}&offerId=${offerId}`;
    let payload;
    if (data.chat) {
      payload = {
        messeges: [...data.chat.messeges, `${owner}: ${message}`],
      };
    } else {
      payload = {
        messeges: [`${owner}: ${message}`],
      };
    }
    wrapRequest({
      method: 'POST',
      url,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(({ data }) => {
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setRefreshChat(!refreshChat);
      });
  };

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
