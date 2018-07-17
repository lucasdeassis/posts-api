[![Build Status](https://semaphoreci.com/api/v1/lucasdeassis/posts-api/branches/master/badge.svg)](https://semaphoreci.com/lucasdeassis/posts-api)

# NodeJS POSTS API

This is a the Node.js Posts API.

### Stack
- Node.js 8.11
- Express 4.14
- Mongoose 5.0

### How to run

before all, download and install mongodb in your user folder and run
```
$ ~/mongo/bin/mongod --dbpath ~/mongo-data/
```
to start the mongo daemon.

Now you have mongodb running in order to connect using the repository. The API runs on a mongo database locally named `PostsApp`.

Right after, issue:

```
$ yarn install && yarn start
```

Then, you'll see the host and port server message `listening at port http://localhost:8080`

And that's it! consume the API and see the results!

To run tests, type:
```
$ yarn test
```

To run the linter, try `yarn lint`

Check out the example folder at `/example` 

