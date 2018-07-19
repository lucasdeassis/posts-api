import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  name,
  label,
  error,
  type,
  onChange,
  classnames,
}) => (
  <div className={classnames}>
    <label htmlFor={name}>
      <span>
        {`${label}:`}
      </span>
      <input name={name} type={type} onChange={onChange} />
    </label>
    <div>
      {error}
    </div>
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  classnames: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  error: '',
  classnames: '',
  onChange: () => {},
};

export default Input;
