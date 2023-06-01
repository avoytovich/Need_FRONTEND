import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { wrapRequest } from 'utils/api';
import { API } from 'helper/constants';
import { Loader } from 'components';

import ChatView from './ChatView';

const ChatScreen = ({ owner, needId, offerId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshChat, setRefreshChat] = useState(false);

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
  }, [needId, offerId, refreshChat]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ChatView
      owner={owner}
      needId={needId}
      offerId={offerId}
      data={data}
      refreshChat={refreshChat}
      setRefreshChat={setRefreshChat}
    />
  );
};

export default ChatScreen;
