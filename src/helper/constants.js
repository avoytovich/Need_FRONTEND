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
    admin: {
      TITLE: 'ACTIVATION / DISACTIVATION USERS',
    },
    needs: {
      NEEDS: 'Needs',
      CREATE: 'Create',
      ABILITY_TO_PAY: 'ability to pay:',
      GRN: 'grn',
      SEARCH_NEED: 'Search NEED',
    },
    needsDetails: {
      TITLE: 'Title',
      STATUS: 'status:',
      ABILITY_TO_PAY: 'Ability to pay:',
      DESCRIPTION: 'Description',
      SAVE: 'SAVE',
      RESET: 'RESET',
      DELETE: 'DELETE',
      CONFIRMATION_DELETE: 'Do you still want to delete this NEED?',
      YES: 'YES',
      NO: 'NO',
      NO_NEEDS: 'No Needs',
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
      SAVE: 'SAVE',
      RESET: 'RESET',
      DELETE: 'DELETE',
      CONFIRMATION_DELETE: 'Do you still want to delete this OFFER?',
      YES: 'YES',
      NO: 'NO',
      CHAT: 'CHAT',
      NO_OFFERS: 'No Offers',
      ADD_OFFER: 'ADD OFFER',
      DESCRIPTION: 'Description',
      ISACCEPTED: 'THIS OFFER IS ACCEPTED',
      PROHIBITION: 'PROHIBITION TO ACCEPT: ONLY ONE OFFER CAN BE ACCEPTED',
    },
    offerAdd: {
      CREATING_OFFER: 'CREATING OFFER',
      DESCRIPTION: 'Description',
      SAVE: 'SAVE',
      CANCEL: 'CANCEL',
    },
    chat: {
      CREATE_MESSAGE: 'Create message',
      SEND: 'Send',
    },
  },
};

export { API, PER_PAGE, text };
