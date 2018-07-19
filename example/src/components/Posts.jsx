import React from 'react';
import PropTypes from 'prop-types';

const Posts = ({ posts }) => (
  <ul>
    {posts.map(post => (
      <li key={post._id}>
        {`Title: ${post.title}`}
        <ul>
          <li>
            {`Text: ${post.text}`}
          </li>
          <li>
            {`User: ${post.userName}`}
          </li>
          <li>
            {`E-mail: ${post.userEmail}`}
          </li>
          <li>
            {`Created At: ${new Date(post.createdAt).toLocaleString()}`}
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
