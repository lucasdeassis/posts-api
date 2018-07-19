import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { savePost } from '../actions';
import validate from '../utils/validate';
import Input from '../components/Input';

class CreatePostContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  handleSubmitLogin = (values, { setSubmitting }) => {
    const { dispatch, history } = this.props;

    dispatch(savePost(values))
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
          Create Post
        </h1>
        <Formik
          initialValues={{
            title: '',
            text: '',
          }}
          validate={values => validate('createPost', values)}
          onSubmit={this.handleSubmitLogin}
          render={({
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Input
                name="title"
                label="Title"
                error={errors.title}
                onChange={handleChange}
              />

              <Input
                name="text"
                label="Text"
                error={errors.text}
                onChange={handleChange}
              />

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

export default connect(null)(CreatePostContainer);
