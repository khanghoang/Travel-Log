import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTravellers, callPatchDestinations, logout } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import UserDestinationPanel from '../components/UserDestinationPanel';
import {Button} from 'react-bootstrap';
import {cookie} from '../helpers/utils';

class App extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    this.props.dispatch(logout())
  }

  retrictUser(props) {
    const { currentUser } = props;
    // haven't login yet
    if(!currentUser.token) {
      this.context.router.transitionTo("Login");
    }
  }

  componentDidMount() {
    const { currentUser, dispatch } = this.props;
    this.retrictUser(this.props);
    dispatch(fetchTravellers(currentUser.token));
  }

  componentWillReceiveProps(nextProps) {
    this.retrictUser(nextProps);
  }

  onCheckVisited() {
    var self = this;
    const {currentUser, travelers, dispatch} = self.props;
    return function(destinationID) {
      console.log(destinationID);
      const id = currentUser.id;
      const token = currentUser.token;
      let destinations = _.chain(travelers.data)
      .filter(function(user) {
        return user.id === id
      })
      .first()
      .value().destinations;
      destinations = _.chain(destinations)
      .map(function(des) {
        if(des._id === destinationID){
          des.visited = !des.visited;
        }

        return des;
      })
      .value();
      dispatch(callPatchDestinations(token, id, destinations));
    }
  }

  onDestinationDelete() {
    var self = this;
    const {currentUser, travelers, dispatch} = self.props;
    return function(destinationID) {
      const id = currentUser.id;
      const token = currentUser.token;
      let destinations = _.chain(travelers.data)
      .filter(function(user) {
        return user.id === id
      })
      .first()
      .value().destinations;
      destinations = _.chain(destinations)
      .filter(function(des) {
        return des._id !== destinationID
      })
      .value();
      dispatch(callPatchDestinations(token, id, destinations));
    }
  }

  render() {
    const { currentUser, travelers, isLoading} = this.props;
    return (
      <div>
        <h2>Hi {currentUser.name}
        <Button
        onClick={this.logout.bind(this)}
        >Logout</Button>
        </h2>
        <UserDestinationPanel
        destinations={travelers}
        onCheckVisited={this.onCheckVisited()}
        onDestinationDelete={this.onDestinationDelete()}
        isLoading={isLoading}
        currentUser={currentUser}
        />
      </div>
    );
  }
}

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

App.contextTypes = {
    router: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  let { currentUser, travelers } = state;
  const isLoading = travelers.isLoading;
  currentUser = currentUser || {};

  return {
    currentUser,
    travelers,
    isLoading
  };
}

export default connect(mapStateToProps)(App);
