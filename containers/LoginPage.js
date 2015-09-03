import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {callLogin} from '../actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  componentWillReceiveProps(nextProps) {
  }

  handleLogin(username) {
    this.props.dispatch(callLogin(username));
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

export default connect()(LoginPage);

