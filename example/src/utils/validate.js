import spected from 'spected';
import * as validationSchemas from './getValidationSchema';

const getErrorsFromValidationResult = (validationResult) => {
  const FIRST_ERROR = 0;
  return Object.keys(validationResult).reduce(
    (errors, field) => (
      validationResult[field] !== true
        ? { ...errors, [field]: validationResult[field][FIRST_ERROR] }
        : errors
    ),
    {}
  );
};

export default (form, values) => {
  const spec = validationSchemas[form](values);
  const validationResult = spected(spec, values);
  return getErrorsFromValidationResult(validationResult);
};
