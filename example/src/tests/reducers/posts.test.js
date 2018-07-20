/* global describe, it, expect */

import reducer from '../../reducers/posts';
import {
  SAVE_POST, DELETE_POST, REQUEST_POSTS, RECEIVE_POSTS
} from '../../actions';

import postsFixture from '../fixtures/posts.json';

describe('posts reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        allPosts: {
          isFetching: false,
          items: [],
        },
        selectedPost: '',
      }
    );
  });

  it('should handle REQUEST_POSTS', () => {
    expect(reducer(undefined, {
      type: REQUEST_POSTS,
    })).toEqual(
      {
        allPosts: {
          isFetching: true,
          items: [],
        },
        selectedPost: '',
      }
    );
  });

  it('should handle RECEIVE_POSTS', () => {
    expect(reducer({
      allPosts: {
        isFetching: true,
        items: [],
      },
      selectedPost: '',
    }, {
      type: RECEIVE_POSTS,
      posts: postsFixture,
    })).toEqual(
      {
        allPosts: {
          isFetching: false,
          items: postsFixture,
        },
        selectedPost: '',
      }
    );
  });

  it('should handle SAVE_POST', () => {
    expect(reducer(undefined, {
      type: SAVE_POST,
      post: postsFixture[0]
    })).toEqual(
      {
        allPosts: {
          isFetching: false,
          items: [postsFixture[0]],
        },
        selectedPost: '',
      }
    );
  });

  it('should handle SAVE_POST appending to existing items', () => {
    expect(reducer({
      allPosts: {
        isFetching: false,
        items: [postsFixture[0]],
      },
      selectedPost: '',
    }, {
      type: SAVE_POST,
      post: postsFixture[1]
    })).toEqual(
      {
        allPosts: {
          isFetching: false,
          items: postsFixture,
        },
        selectedPost: '',
      }
    );
  });

  it('should handle DELETE_POST', () => {
    expect(reducer({
      allPosts: {
        isFetching: false,
        items: postsFixture,
      },
      selectedPost: '',
    }, {
      type: DELETE_POST,
      post: postsFixture[1]
    })).toEqual(
      {
        allPosts: {
          isFetching: false,
          items: [postsFixture[0]],
        },
        selectedPost: '',
      }
    );
  });
});
