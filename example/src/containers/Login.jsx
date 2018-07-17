import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { saveUser } from '../actions';
import validate from '../utils/validate';

class LoginContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  handleSubmitLogin = (values, { setSubmitting }) => {
    const { dispatch, history } = this.props;

    dispatch(saveUser('login', values))
      .then(() => {
        setSubmitting(false);
        history.push('/posts');
      })
      .catch(() => {
        setSubmitting(false);
      });
  }

  render() {
    return (
      <div>
        <h1>
          Login
        </h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validate={validate}
          onSubmit={this.handleSubmitLogin}
          render={({
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                <span>
                E-mail:
                </span>
                <input name="email" type="email" onChange={handleChange} />
              </label>
              <div>
                {errors.email}
              </div>

              <label htmlFor="password">
                <span>
                  Password:
                </span>
                <input name="password" type="password" onChange={handleChange} />
              </label>
              <div>
                {errors.password}
              </div>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default connect(null)(LoginContainer);
