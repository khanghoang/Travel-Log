import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {loginIfNeeded} from '../actions';
import {Navigation} from 'react-router';
import {Input, Button} from 'react-bootstrap';

require('./LoginPage.less');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // if user already login, redirect to MainPage
    if(this.props.token) {
      this.context.router.transitionTo('MainPage');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.token) {
      this.context.router.transitionTo('MainPage');
    }
  }

  handleLogin(username) {
    this.props.dispatch(loginIfNeeded(username));
  }

  handleLoginClick(e) {
    e.preventDefault();
    let username = "evie";
    this.handleLogin(username);
  }

  render() {
    return (
      <form className="form-signin">
        <h2 className="form-signin-heading">Please sign in</h2>
          <label for="inputUsername" class="sr-only">Username</label>
          <Input
          type="text"
          placeholder="Enter your name"
          ref="input"
          labelClassName='label-class'
          />
          <button className="btn btn-primary btn-block" type="submit" onClick={this.handleLoginClick.bind(this)}>Sign in</button>
      </form>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

LoginPage.contextTypes = {
    router: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  let { currentUser } = state;
  currentUser = currentUser || {};
  const token = currentUser.token;
  return {
    currentUser,
    token
  };
}

export default connect(mapStateToProps)(LoginPage);

