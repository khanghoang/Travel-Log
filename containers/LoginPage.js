import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {loginIfNeeded} from '../actions';
import {Navigation} from 'react-router';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    debugger;

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
      <div>
        <h1>Login</h1>
        <form action="" method="POST">
          <input type="text"></input>
          <input type="submit" onClick={this.handleLoginClick.bind(this)}></input>
        </form>
      </div>
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

