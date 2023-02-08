import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { wrapRequest } from './../../../../utils/api';
import { API } from './../../../../helper/constants';
import { Loader } from './../../../../components';
import OffersView from './OffersView.js';

const OffersScreen = ({ isOwnerNeed }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    let url = `${API.URL}:${API.PORT}/offers-to-need?needId=${id}`;
    wrapRequest({
      method: 'GET',
      url,
      mode: 'cors',
      cache: 'default',
    })
      .then(({data}) => {
        setData(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return <OffersView data={data} isOwnerNeed={isOwnerNeed} />;
};

export default OffersScreen;
