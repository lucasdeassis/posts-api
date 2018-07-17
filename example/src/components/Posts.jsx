import React from 'react';
import PropTypes from 'prop-types';

const Posts = ({ posts }) => (
  <ul>
    {posts.map(post => (
      <li key={post._id}>
        <li>
          {post.title}
        </li>
        <ul>
          <li>
            {`(${post.text})`}
          </li>
          <li>
            {`user: ${post.userName}`}
          </li>
          <li>
            {`email: ${post.userEmail}`}
          </li>
          <li>
            {`createdAt: ${new Date(post.createdAt).toLocaleString()}`}
          </li>
        </ul>
      </li>
    ))}
  </ul>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Posts;
