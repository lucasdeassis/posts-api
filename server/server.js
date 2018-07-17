require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

require('./db/mongoose');
const { ObjectID } = require('mongodb');

const { User } = require('./models/user');
const { Post } = require('./models/post');
const { authenticate } = require('./middleware/authenticate');

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth');
  res.header(
    'Access-Control-Expose-Headers',
    'x-auth'
  );

  next();
};

const timeLogger = (req, res, next) => {
  const now = new Date().toString();

  console.log(`${now}: ${req.method} ${req.url}`); // eslint-disable-line no-console

  next();
};

const app = express();
const port = process.env.PORT;

app.use(cors);
app.use(bodyParser.json());
app.use(timeLogger);

app.post('/register', async (req, res) => {
  try {
    const body = _.pick(req.body, ['firstName', 'surname', 'email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (err) {
    res.status(400).send();
  }
});

app.post('/create/post', authenticate, async (req, res) => {
  try {
    const body = _.pick(req.body, ['title', 'text']);
    const post = new Post({
      ...body,
      userName: `${req.user.firstName} ${req.user.surname}`,
      userEmail: req.user.email,
    });

    await post.save();
    res.status(201).send(post);
  } catch(err) {
    res.status(400).send(err);
  }
});

app.get('/posts', authenticate, async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send({ posts });
  } catch(err) {
    res.status(400).send(err);
  }
});

app.delete('/post/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const post = await Post.findOneAndRemove({
      _id: id,
    });

    if (!post) {
      return res.status(404).send();
    }

    res.send({ post });
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`); // eslint-disable-line no-console
});

module.exports = { app };
