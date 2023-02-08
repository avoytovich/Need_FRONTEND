import React, { useState } from 'react';

import OfferAddView from './OfferAddView';

const OfferAddScreen = ({ handleClose }) => {
  const [description, setDescription] = useState('');

  return (
    <OfferAddView
      handleClose={handleClose}
      description={description}
      setDescription={setDescription}
    />
  );
};

export default OfferAddScreen;
