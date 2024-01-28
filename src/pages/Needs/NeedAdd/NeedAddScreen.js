import React, { useReducer, useState } from 'react';
import { toast } from 'react-toastify';

import { API, PER_PAGE } from 'helper/constants';
import { wrapRequest } from 'utils/api';

import NeedAddView from './NeedAddView';

const NeedAddScreen = ({
  handleClose,
  page,
  setPage,
  setRefresh,
  totalItems,
}) => {
  const [title, setTitle] = useState('');
  const [abilityToPay, setAbilityToPay] = useState('');
  const [description, setDescription] = useState('');

  const reducer = (state, action) => {
    switch (action.type) {
      case 'TITLE':
        return { ...state, title: !!action.payload };
      case 'ABILITY_TO_PAY':
        return { ...state, abilityToPay: !!action.payload };
      case 'DESCRIPTION':
        return { ...state, description: !!action.payload };
      default:
        throw new Error();
    }
  };

  const [errors, dispatchError] = useReducer(reducer, {
    title: false,
    abilityToPay: false,
    description: false,
  });

  const handleTitle = (value) => {
    setTitle(value);
    if (!value) {
      dispatchError({ type: 'TITLE', payload: true });
    } else {
      dispatchError({ type: 'TITLE', payload: false });
    }
  };

  const handleAbilityToPay = (e) => {
    e.stopPropagation();
    if (e.target.value && !isNaN(e.target.value)) {
      dispatchError({ type: 'ABILITY_TO_PAY', payload: false });
      setAbilityToPay(e.target.value);
    } else if (e.target.value === '') {
      dispatchError({ type: 'ABILITY_TO_PAY', payload: true });
      setAbilityToPay(e.target.value);
    } else {
      dispatchError({ type: 'ABILITY_TO_PAY', payload: true });
    }
  };

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

    const resPage = Number.isInteger(totalItems / PER_PAGE)
      ? totalItems / PER_PAGE + 1
      : Math.ceil(totalItems / PER_PAGE);

    if (!title || !abilityToPay || !description) {
      !title && dispatchError({ type: 'TITLE', payload: true });
      !abilityToPay && dispatchError({ type: 'ABILITY_TO_PAY', payload: true });
      !description && dispatchError({ type: 'DESCRIPTION', payload: true });
      return;
    }

    const payload = {
      title,
      ability_to_pay: abilityToPay,
      description,
    };

    await wrapRequest({
      method: 'POST',
      url: `${API.URL[process.env.NODE_ENV]}/needs/create`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(({ data: { message } }) => {
        handleClose();
        if (page !== resPage) {
          setPage(resPage);
        } else {
          setRefresh((p) => p + 1);
        }
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
    <NeedAddView
      handleClose={handleClose}
      title={title}
      handleTitle={handleTitle}
      abilityToPay={abilityToPay}
      handleAbilityToPay={handleAbilityToPay}
      handleDescription={handleDescription}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
};

export default NeedAddScreen;
