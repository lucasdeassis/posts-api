import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { saveUser } from '../actions';
import validate from '../utils/validate';

class RegisterContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  handleSubmitRegister = (values, { setSubmitting }) => {
    const { dispatch, history } = this.props;

    dispatch(saveUser('register', values))
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
          Register
        </h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validate={validate}
          onSubmit={this.handleSubmitRegister}
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

              <label htmlFor="firstName">
                <span>
                  First Name:
                </span>
                <input name="firstName" type="text" onChange={handleChange} />
              </label>
              <div>
                {errors.firstName}
              </div>

              <label htmlFor="firstName">
                <span>
                  Surname:
                </span>
                <input name="surname" type="text" onChange={handleChange} />
              </label>
              <div>
                {errors.surname}
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

export default connect(null)(RegisterContainer);
