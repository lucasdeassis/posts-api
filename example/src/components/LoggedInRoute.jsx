import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoggedInRoute = ({ user, component: Component, ...restProps }) => {
  const isLoggedIn = !!user.token;

  return (
    <Route
      {...restProps}
      render={props => (isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      ))
    }
    />
  );
};

LoggedInRoute.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  component: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({ user }))(LoggedInRoute);
