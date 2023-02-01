import React, { useState } from 'react';

import NeedAddView from './NeedAddView';

const NeedAddScreen = (props) => {
  const [title, setTitle] = useState('');
  const [abilityToPay, setAbilityToPay] = useState('');

  return (
    <NeedAddView
      title={title}
      setTitle={setTitle}
      abilityToPay={abilityToPay}
      setAbilityToPay={setAbilityToPay}
    />
  );
};

export default NeedAddScreen;
