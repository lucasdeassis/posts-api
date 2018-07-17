import { combineReducers } from 'redux';
import {
  SELECT_POST,
  REQUEST_POSTS, RECEIVE_POSTS,
} from '../actions';

const selectedPost = (state = '', action) => {
  switch (action.type) {
    case SELECT_POST:
      return action.post;
    default:
      return state;
  }
};

const posts = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
      };
    default:
      return state;
  }
};

const postsByUser = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.email]: posts(state[action.email], action),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  postsByUser,
  selectedPost,
});

export default rootReducer;
