
const isEmpty = value => !value || !value.trim();

const isEmail = (value) => {
  const EMAIL_REGEXP = /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/;
  return EMAIL_REGEXP.test(value);
};

const schemas = {
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
  surname: [
    [value => !isEmpty(value), 'Surname is required!'],
  ],
  title: [
    [value => !isEmpty(value), 'Post Title is required!'],
  ],
  text: [
    [value => !isEmpty(value), 'Post Text is required!'],
  ],
};

export const login = () => ({
  email: schemas.email,
  password: schemas.password,
});

export const register = () => ({
  email: schemas.email,
  firstName: schemas.firstName,
  surname: schemas.surname,
  password: schemas.password,
});

export const createPost = () => ({
  title: schemas.title,
  text: schemas.text,
});
