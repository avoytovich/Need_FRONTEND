const API = {
  URL: 'http://localhost',
  PORT: 8033,
};

const PER_PAGE = 9;

const text = {
  components: {
    footer: {
      COPYRIGHT: 'Copyright © 2022 | Created by Andrii Voitovych',
    },
    header: {
      BACK: 'BACK',
      LOG_OUT: 'Log Out',
    },
    tableFilters: {
      ACTUAL: 'ACTUAL',
      NOT_ACTUAL: 'NOT ACTUAL',
      IN_PROGRESS: 'IN PROGRESS',
    },
  },
  pages: {
    errorPage: {
      OOPS: 'Oops!',
      SORRY_MESSAGE: 'Sorry, an unexpected error has occurred.',
    },
    login: {
      LOG_IN_SIGN_UP: 'Log In / Sign Up',
    },
    needs: {
      NEEDS: 'Needs',
      CREATE: 'Create',
      ABILITY_TO_PAY: 'ability to pay:',
      GRN: 'grn',
      SEARCH_NEED: 'Search NEED',
    },
    needsDetails: {
      STATUS: 'status:',
      ABILITY_TO_PAY: 'ability to pay:',
      DESCRIPTION: 'Description',
      SAVE: 'SAVE',
      CANCEL: 'CANCEL',
    },
    needAdd: {
      CREATING_NEED: 'CREATING NEED',
      TITLE: 'title:',
      PAY_FOR: 'pay for:',
      PROPOSE_TO_PAY_MESSAGE: 'type how much are you ready to pay for?',
      DESCRIPTION: 'Description',
      SAVE: 'SAVE',
      CANCEL: 'CANCEL',
    },
    offers: {
      ACCEPT: 'ACCEPT',
      REJECT: 'REJECT',
      NO_OFFERS: 'No Offers',
      ADD_OFFER: 'ADD OFFER',
      DESCRIPTION: 'Description',
    },
    offerAdd: {
      CREATING_OFFER: 'CREATING OFFER',
      DESCRIPTION: 'Description',
      SAVE: 'SAVE',
      CANCEL: 'CANCEL',
    },
  },
};

export { API, PER_PAGE, text };
