import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded, deletePost } from '../actions';
import Posts from '../components/Posts';

class PostsContainer extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  onPostDelete = (id) => {
    const { dispatch } = this.props;

    dispatch(deletePost(id));
  }

  render() {
    const {
      posts, isFetching
    } = this.props;
    const isEmpty = posts.length === 0;

    if (isFetching) {
      return (
        <h2>
        Loading...
        </h2>
      );
    }

    if (isEmpty) {
      return (
        <h2>
        Empty.
        </h2>
      );
    }

    return (
      <div>
        <Posts posts={posts} deletePost={this.onPostDelete} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    posts: {
      allPosts,
    },
  } = state;

  const {
    isFetching,
    items: posts,
  } = allPosts || {
    isFetching: true,
    items: []
  };

  return {
    posts,
    isFetching,
  };
};

export default connect(mapStateToProps)(PostsContainer);
