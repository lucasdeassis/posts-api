
const isEmpty = value => !value || !value.trim();

const isEmail = (value) => {
  const EMAIL_REGEXP = /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/;
  return EMAIL_REGEXP.test(value);
};

export default () => ({
  email: [
    [value => !isEmpty(value), 'E-mail is required!'],
    [value => isEmail(value), 'E-mail is not valid!'],
  ],
  password: [
    [value => !isEmpty(value), 'Password is required!'],
    [
      value => value.length >= 6,
      `Password has to be longer than ${6} characters!`,
    ],
  ],
  firstName: [
    [value => !isEmpty(value), 'First name is required!'],
  ],
  consent: [
    [value => value === true, 'You have to agree with our Terms and Conditions!'],
  ]
});
