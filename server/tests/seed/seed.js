const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { User } = require('./../../models/user');
const { Post } = require('./../../models/post');

const userOneId = new ObjectID();
const userOneFirstName = 'andrew';
const userTwoFirstName = 'jen';
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  firstName: userOneFirstName,
  surname: 'kett',
  email: 'andrew@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString(),
  } ],
}, {
  _id: userTwoId,
  firstName: userTwoFirstName,
  surname: 'simons',
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString(),
  } ],
} ];

const posts = [{
  _id: new ObjectID(),
  title: 'First test post',
  text: 'First post text description',
  userName: `${userOneFirstName} kett`,
  userEmail: 'andrew@example.com',
}, {
  _id: new ObjectID(),
  title: 'Second test post',
  text: 'Second post text description',
  userName: `${userTwoFirstName} simons`,
  userEmail: 'jen@example.com',
  createdAt: new Date('2018-07-17T13:59:32+00:00'),
} ];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo ]);
  }).then(() => done());
};

const populatePosts = (done) => {
  Post.remove({}).then(() => {
    return Post.insertMany(posts);
  }).then(() => done());
};

module.exports = { users, populateUsers, posts, populatePosts };
