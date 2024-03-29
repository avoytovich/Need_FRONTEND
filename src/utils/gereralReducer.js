const generalReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
    case 'SAVE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SAVE_ACTIVE_LINK':
      return {
        ...state,
        activeLink: action.payload,
      };
    case 'PREV_PAGE':
      return {
        ...state,
        prevPage: action.payload,
      };
    default:
      return state;
  }
};

export default generalReducer;
