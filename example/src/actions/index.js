export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_POST = 'SELECT_POST';

const API_URL = 'http://localhost';
const API_PORT = '3000';

export const selectPost = post => ({
  type: SELECT_POST,
  post,
});

export const requestPosts = user => ({
  type: REQUEST_POSTS,
  user,
});

export const receivePosts = (user, json) => ({
  type: RECEIVE_POSTS,
  user,
  posts: json.filter(post => post.userEmail === user.email),
});

const fetchPosts = user => (dispatch) => {
  dispatch(requestPosts(user));
  return fetch(`${API_URL}:${API_PORT}/posts`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(user, json)));
};

const shouldFetchPosts = (state, user) => {
  const posts = state.postsByUser[user];

  return !posts || !posts.isFetching;
};

export const fetchPostsIfNeeded = user => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), user)) {
    return dispatch(fetchPosts(user));
  }
};
