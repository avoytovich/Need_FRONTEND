import React, { useReducer, useState } from 'react';

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

  return (
    <OfferAddView
      handleClose={handleClose}
      description={description}
      setDescription={setDescription}
      errors={errors}
      dispatchError={dispatchError}
    />
  );
};

export default OfferAddScreen;
