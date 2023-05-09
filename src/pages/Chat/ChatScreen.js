import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { wrapRequest } from 'utils/api';
import { API } from 'helper/constants';
import { Loader } from 'components';

import ChatView from './ChatView';

const ChatScreen = ({ needId, offerId, refreshChat, setRefreshChat }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = `${API.URL}:${API.PORT}/chat?needId=${needId}&offerId=${offerId}`;
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
  }, [needId, offerId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ChatView
      needId={needId}
      offerId={offerId}
      data={data}
      refreshChat={refreshChat}
      setRefreshChat={setRefreshChat}
    />
  );
};

export default ChatScreen;
