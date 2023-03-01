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
    case 'prevPage':
      return {
        type: 'PREV_PAGE',
        payload,
      };
    default:
      break;
  }
};

export default actions;
