import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { API } from 'helper/constants';
import { wrapRequest } from 'utils/api';
import { Loader } from 'components';

import DashboardOffersView from './DashboardOffersView';

const DashboardOffersScreen = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshOffer, setRefreshOffer] = useState(false);

  useEffect(() => {
    let url = `${API.URL}:${API.PORT}/offers-to-user`;
    wrapRequest({
      method: 'GET',
      url,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data }) => {
        data.sort((a, b) => a.id - b.id);
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
  }, [refreshOffer]);

  if (loading) {
    return <Loader />;
  }

  return (
    <DashboardOffersView
      data={data}
      refreshOffer={refreshOffer}
      setRefreshOffer={setRefreshOffer}
    />
  );
};

export default DashboardOffersScreen;
