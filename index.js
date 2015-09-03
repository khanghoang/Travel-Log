import 'babel-core/polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import MainPage from './containers/App';
import LoginPage from './containers/LoginPage';
import configureStore from './store/configureStore';

const store = configureStore();

import Router from 'react-router';
import {RouteHandler, Route}  from 'react-router';


var App = React.createClass({
  render () {
    return (
      <div>
        <h1>App</h1>
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
    <Route path="/login" handler={LoginPage}/>
    <Route path="/main_page" handler={MainPage}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
