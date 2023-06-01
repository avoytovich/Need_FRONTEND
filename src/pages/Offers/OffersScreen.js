import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { wrapRequest } from 'utils/api';
import { API } from 'helper/constants';
import { Loader } from 'components';
import OffersView from './OffersView.js';

const OffersScreen = ({ isOwnerNeed, need, refreshNeed, setRefreshNeed }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshOffer, setRefreshOffer] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id || need?.id) {
      let url = `${API.URL[process.env.NODE_ENV]}/offers-to-need?needId=${
        id || need?.id
      }`;
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
    } else {
      setData([]);
      setLoading(false);
    }
  }, [id, need?.id, refreshOffer]);

  if (loading) {
    return <Loader />;
  }

  return (
    <OffersView
      data={data}
      isOwnerNeed={isOwnerNeed}
      need={need}
      refreshOffer={refreshOffer}
      setRefreshOffer={setRefreshOffer}
      refreshNeed={refreshNeed}
      setRefreshNeed={setRefreshNeed}
    />
  );
};

export default OffersScreen;
