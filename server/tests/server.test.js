const expect = require('chai').expect;

const request = require('supertest');

const {app} = require('./../server');
const {User} = require('./../models/user');
const {users, populateUsers} = require('./seed/seed');

const userFixture = require('./fixtures/user.json');

beforeEach(populateUsers);

describe('GET /me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).to.eq(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).to.deep.eq({});
      })
      .end(done);
  });
});

describe('POST /register', () => {
  it('should create a user', (done) => {
    const {
      email, firstName, surname, password
     } = userFixture;

    request(app)
      .post('/register')
      .send(userFixture)
      .expect(200)
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

        User.findOne({email}).then((user) => {
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
        password: '123'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/register')
      .send({
        email: users[0].email,
        password: 'Password123!'
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
        password: users[1].password
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
            token: res.headers['x-auth']
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
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).to.not.exist;
      })
      .end((err, res) => {
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

describe('DELETE /me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).to.eq(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
