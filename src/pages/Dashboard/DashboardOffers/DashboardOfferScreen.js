import React, { useState, useReducer, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';

import { withLayout } from 'hocs';
import { API } from 'helper/constants';
import { wrapRequest } from 'utils/api';
import { Loader } from 'components';

import DashboardOffersView from './DashboardOffersView';

const DashboardOffersScreen = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [paginOffers, setPaginOffers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshOffer, setRefreshOffer] = useState(false);

  const initialState = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  };

  const reducerDescription = (state, action) => {
    switch (action.type) {
      case 'DESCRIPTION_UPDATE':
        return { ...state, [value]: action.payload };
      case 'DESCRIPTION_RESET':
        return { ...state, [value]: action.payload };
      case 'DESCRIPTION_INITIAL':
        return { ...action.payload };
      default:
        throw new Error();
    }
  };

  const [updDescription, setUpdDescription] = useReducer(
    reducerDescription,
    initialState,
  );

  const initialErrors = {
    0: { description: false },
    1: { description: false },
    2: { description: false },
    3: { description: false },
    4: { description: false },
  };

  const reducerError = (state, action) => {
    switch (action.type) {
      case 'DESCRIPTION_ERROR':
        return { ...state, [value]: { description: action.payload } };
      case 'ERROR_RESET':
        return initialErrors;
      default:
        throw new Error();
    }
  };

  const [errors, dispatchError] = useReducer(reducerError, initialErrors);

  const paginDataForward = () => {
    if (data.length > 5) {
      setPaginOffers((s) => (s += 1));
      setValue(0);
      setUpdDescription({ type: 'DESCRIPTION_INITIAL', payload: initialState });
    }
  };

  const paginDataBack = () => {
    if (data.length > 5) {
      setPaginOffers((s) => (s -= 1));
      setValue(0);
      setUpdDescription({ type: 'DESCRIPTION_INITIAL', payload: initialState });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dataOffers = useMemo(
    () => data.slice(paginOffers * 5, paginOffers * 5 + 5),
    [data, paginOffers],
  );

  const handleUpdDescription = (e) => {
    e.stopPropagation();
    if (e.target.value !== '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: false });
      setUpdDescription({
        type: 'DESCRIPTION_UPDATE',
        payload: e.target.value,
      });
    } else if (e.target.value === '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
      setUpdDescription({
        type: 'DESCRIPTION_UPDATE',
        payload: e.target.value,
      });
    } else {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
    }
  };

  const handleSave = (e, description) => {
    e.stopPropagation();
    const payload = {
      description: updDescription[value] || description,
    };
    wrapRequest({
      method: 'PUT',
      url: `${API.URL[process.env.NODE_ENV]}/offer/${
        dataOffers[value].id
      }/update`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(({ data: { message } }) => {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setRefreshOffer(!refreshOffer);
      });
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setUpdDescription({
      type: 'DESCRIPTION_RESET',
      payload: dataOffers[value].description,
    });
    dispatchError({ type: 'ERROR_RESET' });
  };

  const handleDelete = () => {
    wrapRequest({
      method: 'DELETE',
      url: `${API.URL[process.env.NODE_ENV]}/offer/${
        dataOffers[value].id
      }/delete`,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data: { message } }) => {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setValue(0);
        setRefreshOffer(!refreshOffer);
      });
  };

  useEffect(() => {
    let url = `${API.URL[process.env.NODE_ENV]}/offers-to-user`;
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

  useEffect(() => {
    if (!dataOffers.length) {
      setPaginOffers((s) => (s ? s - 1 : 0));
    }
  }, [dataOffers]);

  if (loading) {
    return <Loader />;
  }

  return (
    <DashboardOffersView
      data={data}
      dataOffers={dataOffers}
      value={value}
      paginOffers={paginOffers}
      paginDataForward={paginDataForward}
      paginDataBack={paginDataBack}
      handleChange={handleChange}
      updDescription={updDescription}
      handleUpdDescription={handleUpdDescription}
      handleSave={handleSave}
      handleReset={handleReset}
      handleDelete={handleDelete}
      errors={errors}
    />
  );
};

export default withLayout(DashboardOffersScreen);
