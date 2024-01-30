import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { wrapRequest } from 'utils/api';
import { API } from 'helper/constants';
import { Loader } from 'components';
import OffersView from './OffersView.js';

const OffersScreen = ({ isOwnerNeed, need, refreshNeed, setRefreshNeed }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [paginOffers, setPaginOffers] = useState(0);
  const [refreshOffer, setRefreshOffer] = useState(false);

  const { id } = useParams();

  const paginDataForward = () => {
    if (data.length > 5) {
      setPaginOffers((s) => (s += 1));
      setValue(0);
    }
  };

  const paginDataBack = () => {
    if (data.length > 5) {
      setPaginOffers((s) => (s -= 1));
      setValue(0);
    }
  };

  const dataOffers = useMemo(
    () => data.slice(paginOffers * 5, paginOffers * 5 + 5),
    [data, paginOffers],
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRejection = (e) => {
    let url = `${API.URL[process.env.NODE_ENV]}/offer/${
      dataOffers[value].id
    }/accept_reject`;
    const payload = { isAccepted: false };
    wrapRequest({
      method: 'PUT',
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
        setRefreshNeed(!refreshNeed);
        setRefreshOffer(!refreshOffer);
      });
  };

  const handleAcception = (e) => {
    let url = `${API.URL[process.env.NODE_ENV]}/offer/${
      dataOffers[value].id
    }/accept_reject`;
    const payload = { isAccepted: true };
    wrapRequest({
      method: 'PUT',
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
        setRefreshNeed(!refreshNeed);
        setRefreshOffer(!refreshOffer);
      });
  };

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

  useEffect(() => {
    setValue(0);
  }, [need?.id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <OffersView
      data={data}
      value={value}
      paginDataForward={paginDataForward}
      paginDataBack={paginDataBack}
      paginOffers={paginOffers}
      dataOffers={dataOffers}
      handleChange={handleChange}
      isOwnerNeed={isOwnerNeed}
      need={need}
      handleRejection={handleRejection}
      handleAcception={handleAcception}
    />
  );
};

export default OffersScreen;
