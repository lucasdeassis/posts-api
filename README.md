# NodeJS POSTS API

This is a the Node.js Posts API.

### Stack
- NodeJS 8.11
- ExpressJS 4.16
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
$ node server/server.js
```

Then, you'll see the host and port server message `listening at port http://localhost:3000`

And that's it! consume the API and see the results!

