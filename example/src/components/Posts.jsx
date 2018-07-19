import React from 'react';
import PropTypes from 'prop-types';

const Posts = ({ posts, deletePost }) => (
  <ul>
    {
      posts.map(({
        _id,
        title,
        text,
        userName,
        userEmail,
        createdAt
      }) => (
        <li key={_id}>
          {`Title: ${title}`}
          <ul>
            <li>
              {`Text: ${text}`}
            </li>
            <li>
              {`User: ${userName}`}
            </li>
            <li>
              {`E-mail: ${userEmail}`}
            </li>
            <li>
              {`Created At: ${new Date(createdAt).toLocaleString()}`}
            </li>
            <li>
              <button type="button" onClick={() => deletePost(_id)}>
              Delete Post
              </button>
            </li>
          </ul>
          <br />
        </li>
      ))
    }
  </ul>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default Posts;
