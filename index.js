import 'babel-core/polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import MainPage from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();

var Router = require('react-router');
import {RouteHandler, Route}  from 'react-router';


var App = React.createClass({
  render () {
    return (
      <div>
        <h1>App</h1>
        <RouteHandler/>
      </div>
    )
  }
});

var Login = React.createClass({
  render () {
    return (
      <div>
        <h1>Login Page</h1>
      </div>
    )
  }
});

var MainPageHandler = React.createClass({
  render () {
    return (
      <Provider store={store}>
      {() => <MainPage />}
      </Provider>
    )
  }
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={App}>
    <Route path="/login" handler={Login}/>
    <Route path="/main_page" handler={MainPageHandler}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
