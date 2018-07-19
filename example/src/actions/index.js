import axios from 'axios';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_POST = 'SELECT_POST';
export const SAVE_POST = 'SAVE_POST';
export const DELETE_POST = 'DELETE_POST';
export const SAVE_USER_TOKEN = 'SAVE_USER_TOKEN';

const API_URL = 'http://localhost';
const API_PORT = '8080';

const saveUserToken = (user, token) => ({
  type: SAVE_USER_TOKEN,
  user: {
    ...user,
    token,
  },
});

export const saveUser = (endpoint, user) => dispatch => axios.post(
  `${API_URL}:${API_PORT}/${endpoint}`,
  user
)
  .then(({ data, headers }) => dispatch(saveUserToken(data, headers['x-auth'])));

export const savePost = post => (dispatch, getState) => axios.post(
  `${API_URL}:${API_PORT}/create/post`,
  post,
  { headers: { 'x-auth': getState().user.token } }
)
  .then(({ data }) => dispatch({
    type: SAVE_POST,
    post: data
  }));

export const selectPost = post => ({
  type: SELECT_POST,
  post,
});

export const requestPosts = () => ({
  type: REQUEST_POSTS,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const fetchPosts = ({ user }) => (dispatch) => {
  dispatch(requestPosts());
  return axios.get(`${API_URL}:${API_PORT}/posts`, { headers: { 'x-auth': user.token } })
    .then(({ data }) => dispatch(receivePosts(data.posts)));
};

const shouldFetchPosts = (state) => {
  const posts = state.posts.allPosts;

  return !posts.items.length || !posts.isFetching;
};

export const fetchPostsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts(getState()));
  }

  return {};
};

export const deletePost = id => (dispatch, getState) => axios.delete(
  `${API_URL}:${API_PORT}/post/${id}`,
  { headers: { 'x-auth': getState().user.token } }
)
  .then(({ data }) => dispatch({
    type: DELETE_POST,
    post: data
  }));
