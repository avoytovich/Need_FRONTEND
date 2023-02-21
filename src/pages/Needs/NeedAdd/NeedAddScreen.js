import React, { useReducer, useState } from 'react';

import NeedAddView from './NeedAddView';

const NeedAddScreen = ({ handleClose, setPage, totalItems }) => {
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

  return (
    <NeedAddView
      handleClose={handleClose}
      setPage={setPage}
      totalItems={totalItems}
      title={title}
      setTitle={setTitle}
      abilityToPay={abilityToPay}
      setAbilityToPay={setAbilityToPay}
      description={description}
      setDescription={setDescription}
      errors={errors}
      dispatchError={dispatchError}
    />
  );
};

export default NeedAddScreen;
