import React from 'react';

import connect from 'utils/connectFunction';
// import action from 'utils/actions';
import ProfileView from './ProfileView';

const ProfileScreen = (props) => {
  return <ProfileView />;
};

const mapStateToProps = (state) => {
  return { store: state };
};

const mapDispatchToProps = (dispatch) => {
  // const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    // dispatchPrevPage: actionData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
