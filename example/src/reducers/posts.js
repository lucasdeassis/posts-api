import { combineReducers } from 'redux';
import {
  SELECT_POST,
  REQUEST_POSTS, RECEIVE_POSTS, DELETE_POST, SAVE_POST,
} from '../actions';

const sliceItems = (state, action) => {
  const postIndex = state.findIndex(post => post._id === action.post._id);

  return [
    ...state.slice(0, postIndex),
    ...state.slice(postIndex + 1),
  ];
};

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
    case SAVE_POST:
      return {
        ...state,
        items: [
          ...state.items,
          action.post
        ]
      };
    case DELETE_POST:
      return {
        ...state,
        items: sliceItems(state.items, action),
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
