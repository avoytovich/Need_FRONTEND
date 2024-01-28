import React from 'react';
import { useNavigate } from 'react-router-dom';

import { withLayout } from 'hocs';
import DashboardView from './DashboardView';

const DashboardScreen = (props) => {
  const navigate = useNavigate();

  const handleClickNeed = () => navigate('/dashboard/needs');
  const handleClickOffer = () => navigate('/dashboard/offers');

  return (
    <DashboardView
      handleClickNeed={handleClickNeed}
      handleClickOffer={handleClickOffer}
    />
  );
};

export default withLayout(DashboardScreen);
