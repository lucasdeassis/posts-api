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


const postsReducer = combineReducers({
  allPosts: posts,
  selectedPost,
});

export default postsReducer;
