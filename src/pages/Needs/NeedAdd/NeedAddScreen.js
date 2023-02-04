import React, { useState } from 'react';

import NeedAddView from './NeedAddView';

const NeedAddScreen = ({ handleClose, setPage, totalItems }) => {
  const [title, setTitle] = useState('');
  const [abilityToPay, setAbilityToPay] = useState('');
  const [description, setDescription] = useState('');

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
    />
  );
};

export default NeedAddScreen;
