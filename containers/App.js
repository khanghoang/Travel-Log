import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTravellers, selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import UserDestinationPanel from '../components/UserDestinationPanel';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.props.dispatch(fetchTravellers(currentUser.token));
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChange(nextReddit) {
  }

  handleRefreshClick(e) {
  }

  render() {
    const { currentUser, travelers } = this.props;
    return (
      <div>
        <h2>Hi {currentUser.name}</h2>
        <UserDestinationPanel
        destinations={travelers}
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
  let { currentUser, travelers } = state;
  currentUser = currentUser || {};

  return {
    currentUser,
    travelers
  };
}

export default connect(mapStateToProps)(App);
