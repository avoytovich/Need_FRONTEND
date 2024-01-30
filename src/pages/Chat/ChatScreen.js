import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { wrapRequest } from 'utils/api';
import { API } from 'helper/constants';
import { Loader } from 'components';

import ChatView from './ChatView';

const ChatScreen = ({ owner, needId, offerId }) => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshChat, setRefreshChat] = useState(false);

  const handleMessage = (e) => setMessage(e.target.value);

  const handleSendMessage = () => {
    let url = `${
      API.URL[process.env.NODE_ENV]
    }/chat/create_update?needId=${needId}&offerId=${offerId}`;
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
        setMessage('');
        setRefreshChat(!refreshChat);
      });
  };

  useEffect(() => {
    let url = `${
      API.URL[process.env.NODE_ENV]
    }/chat?needId=${needId}&offerId=${offerId}`;
    wrapRequest({
      method: 'GET',
      url,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setLoading(false);
      });
  }, [needId, offerId, refreshChat]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ChatView
      data={data}
      message={message}
      handleMessage={handleMessage}
      handleSendMessage={handleSendMessage}
    />
  );
};

export default ChatScreen;
