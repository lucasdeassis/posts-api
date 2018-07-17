import {
  SAVE_USER_TOKEN,
} from '../actions';

const user = (state = {}, action) => {
  switch (action.type) {
    case SAVE_USER_TOKEN:
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
};

export default user;
