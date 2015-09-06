import 'babel-core/polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import MainPage from './containers/App';
import LoginPage from './containers/LoginPage';
import configureStore from './store/configureStore';
require("bootstrap-webpack");

const store = configureStore();

if (process.env.BROWSER) {
    require('./index.scss');
}

import Router from 'react-router';
import {RouteHandler, Route}  from 'react-router';


var App = React.createClass({
  render () {
    return (
      <div className="container">
        <Provider store={store}>
        {() => <RouteHandler/>}
        </Provider>
      </div>
    )
  }
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={App}>
    <Route name="Root" path="/" handler={LoginPage}/>
    <Route name="Login" path="/login" handler={LoginPage}/>
    <Route name="MainPage" path="/main_page" handler={MainPage}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
