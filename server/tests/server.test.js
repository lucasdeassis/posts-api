const expect = require('chai').expect;

const request = require('supertest');

const { app } = require('./../server');
const { ObjectID } = require('mongodb');

const { User } = require('./../models/user');
const { Post } = require('./../models/post');

const { posts, populatePosts, users, populateUsers } = require('./seed/seed');

const userFixture = require('./fixtures/user.json');
const postFixture = require('./fixtures/post.json');

beforeEach(populateUsers);
beforeEach(populatePosts);

describe('POST /register', () => {
  it('should create a user', (done) => {
    const {
      email,
      firstName,
      surname,
      password,
    } = userFixture;

    request(app)
      .post('/register')
      .send(userFixture)
      .expect(201)
      .expect((res) => {

        expect(res.headers['x-auth']).to.exist;
        expect(res.body.email).to.eq(email);
        expect(res.body.firstName).to.eq(firstName);
        expect(res.body.surname).to.eq(surname);
        expect(res.body.password).to.be.undefined;
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({ email }).then((user) => {
          expect(user).to.exist;
          expect(user.password).to.not.eq(password);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    request(app)
      .post('/register')
      .send({
        email: 'and',
        password: '123',
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/register')
      .send({
        email: users[0].email,
        password: 'Password123!',
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/login')
      .send({
        email: users[1].email,
        password: users[1].password,
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).to.exist;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).to.include({
            access: 'auth',
            token: res.headers['x-auth'],
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1',
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).to.not.exist;
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).to.eq(1);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('POST /create/post', () => {
  it('should create a new post', (done) => {

    const { title, text } = postFixture;
    request(app)
      .post('/create/post')
      .set('x-auth', users[0].tokens[0].token)
      .send(postFixture)
      .expect(201)
      .expect((res) => {
        expect(res.body.title).to.eq(title);
        expect(res.body.text).to.eq(text);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        Post.find({ title }).then((posts) => {
          expect(posts.length).to.eq(1);
          expect(posts[0].text).to.eq(text);
          expect(posts[0].title).to.eq(title);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create post with invalid body data', (done) => {
    request(app)
      .post('/create/post')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err) => {
        if (err) {
          return done(err);
        }

        Post.find().then((posts) => {
          expect(posts.length).to.eq(2);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create post and return 401 without auth token', (done) => {
    request(app)
      .post('/create/post')
      .send({})
      .expect(401)
      .end((err) => {
        if (err) {
          return done(err);
        }

        Post.find().then((posts) => {
          expect(posts.length).to.eq(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /posts', () => {
  it('should get all posts', (done) => {
    request(app)
      .get('/posts')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.posts.length).to.eq(2);
      })
      .end(done);
  });

  it('should not return posts but return 401 without auth token', (done) => {

    request(app)
      .get('/posts')
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.eq({});
        done();
      });
  });
});

describe('DELETE /post/:id', () => {
  it('should remove a post', (done) => {
    var hexId = posts[0]._id.toHexString();

    request(app)
      .delete(`/post/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.post._id).to.eq(hexId);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        Post.findById(hexId).then((post) => {
          expect(post).to.not.exist;
          done();
        }).catch((e) => done(e));
      });
  });

  it('should remove the second post', (done) => {
    var hexId = posts[1]._id.toHexString();

    request(app)
      .delete(`/post/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.post._id).to.eq(hexId);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        Post.findById(hexId).then((post) => {
          expect(post).to.not.exist;
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if post not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/post/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/post/123abc')
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should not remove post and return 401 without auth token', (done) => {
    var hexId = posts[1]._id.toHexString();

    request(app)
      .delete(`/post/${hexId}`)
      .expect(401)
      .end((err) => {
        if (err) {
          return done(err);
        }

        Post.find().then((posts) => {
          expect(posts.length).to.eq(2);
          done();
        }).catch((e) => done(e));
      });
  });
});
