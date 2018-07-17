import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import postsReducer from './reducers/posts';
import userReducer from './reducers/user';
import Register from './containers/Register';
import Login from './containers/Login';
import Posts from './containers/Posts';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const reducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

render(
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link to="/posts">
              Posts
            </Link>
          </li>
        </ul>

        <hr />
        <Route exact path="/" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/posts" component={Posts} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
