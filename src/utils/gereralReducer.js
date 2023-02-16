const generalReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
    case 'SAVE_ACTIVE_LINK':
      return {
        ...state,
        activeLink: action.payload,
      };
    default:
      return state;
  }
};

export default generalReducer;
