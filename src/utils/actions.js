const actions = (name, payload) => {
  switch (name) {
    case 'saveUserId':
      return {
        type: 'SAVE_USER_ID',
        payload,
      };
    case 'saveActiveLink':
      return {
        type: 'SAVE_ACTIVE_LINK',
        payload,
      };
    default:
      break;
  }
};

export default actions;
