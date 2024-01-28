import React, { useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { wrapRequest } from 'utils/api';
import { API } from 'helper/constants';

import OfferAddView from './OfferAddView';

const OfferAddScreen = ({ handleClose }) => {
  const [description, setDescription] = useState('');

  const reducer = (state, action) => {
    switch (action.type) {
      case 'DESCRIPTION':
        return { ...state, description: !!action.payload };
      default:
        throw new Error();
    }
  };

  const [errors, dispatchError] = useReducer(reducer, {
    description: false,
  });

  const { id } = useParams();

  const handleDescription = (value) => {
    setDescription(value);
    if (!value) {
      dispatchError({ type: 'DESCRIPTION', payload: true });
    } else {
      dispatchError({ type: 'DESCRIPTION', payload: false });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!description) {
      !description && dispatchError({ type: 'DESCRIPTION', payload: true });
      return;
    }
    const payload = {
      description,
    };
    await wrapRequest({
      method: 'POST',
      url: `${API.URL[process.env.NODE_ENV]}/offer/create?needId=${id}`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(({ data: { message } }) => {
        handleClose();
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  };

  return (
    <OfferAddView
      handleDescription={handleDescription}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      errors={errors}
    />
  );
};

export default OfferAddScreen;
