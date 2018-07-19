/* global describe, it, expect */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as actions from '../../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('creates SAVE_USER_TOKEN when save user has been done sucessfully', async () => {
    const mockResponse = {
      data: { firstName: '', surname: '' },
      headers: {
        'x-auth': '2342dasfssds'
      }
    };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedActions = [
      { type: actions.SAVE_USER_TOKEN, user: { ...mockResponse.data, token: mockResponse.headers['x-auth'] } },
    ];

    const store = mockStore({ });

    await store.dispatch(actions.saveUser({}));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates REQUEST_POSTS and RECEIVE_POSTS when fetching posts has been done sucessfully', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: { posts: [{}, {}] }
    }));

    const expectedActions = [
      { type: actions.REQUEST_POSTS },
      { type: actions.RECEIVE_POSTS, posts: [{}, {}] }
    ];

    const user = {
      token: '2432rdqat34532edft423re2'
    };

    const store = mockStore({ });

    await store.dispatch(actions.fetchPosts({user}));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates SAVE_POST when save post has been done sucessfully', async () => {
    const mockPost = { title: 'foo', text: 'bar'};

    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: mockPost }));

    const expectedActions = [
      { type: actions.SAVE_POST, post: mockPost },
    ];

    const store = mockStore({ user: {
      token: '2432rdqat34532edft423re2'
    }});

    await store.dispatch(actions.savePost(mockPost));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DELETE_POST when delete post has been done sucessfully', async () => {
    const mockPost = { title: 'foo', text: 'bar'};

    mockAxios.delete.mockImplementationOnce(() => Promise.resolve({ data: mockPost }));

    const expectedActions = [
      { type: actions.DELETE_POST, post: mockPost },
    ];

    const store = mockStore({ user: {
      token: '2432rdqat34532edft423re2'
    }});

    await store.dispatch(actions.deletePost(mockPost));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
