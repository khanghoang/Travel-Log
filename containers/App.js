import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import UserDestinationPanel from '../components/UserDestinationPanel';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChange(nextReddit) {
  }

  handleRefreshClick(e) {
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <h2>Hi {currentUser.name}</h2>
        <UserDestinationPanel
        destinations=""
        />
      </div>
    );
  }
}

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  let { currentUser } = state;
  currentUser = currentUser || {};

  return {
    currentUser,
  };
}

export default connect(mapStateToProps)(App);
