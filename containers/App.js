import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTravellers, callPatchDestinations, logout } from '../actions';
import UserDestinationPanel from '../components/UserDestinationPanel';
import {Button} from 'react-bootstrap';
import {cookie} from '../helpers/utils';
import AutoCompleteCountry from '../components/AutoCompleteCountry';

require("!style!css!less!./App.less");

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

  onAddDestination() {
    var self = this;
    const {currentUser, travelers, dispatch} = self.props;
    const destinationName = self.refs.destinationInput.refs.geosuggest.state.userInput;
    const id = currentUser.id;
    const token = currentUser.token;
    let destinations = _.chain(travelers.data)
    .filter(function(user) {
      return user.id === id
    })
    .first()
    .value().destinations;
    destinations.push({name: destinationName})
    dispatch(callPatchDestinations(token, id, destinations));
  }

  render() {
    const { currentUser, travelers, isLoading} = this.props;
    return (
      <div className="main-page">
        <h2>Hi {currentUser.name}
        <Button
        onClick={this.logout.bind(this)}
        className="logout-button"
        >Logout</Button>
        </h2>
        <UserDestinationPanel
        destinations={travelers}
        onCheckVisited={this.onCheckVisited()}
        onDestinationDelete={this.onDestinationDelete()}
        isLoading={isLoading}
        currentUser={currentUser}
        />
        <Button
        disabled={isLoading}
        className="add-destination"
        onClick={!isLoading ? this.onAddDestination.bind(this) : null}>
        {isLoading ? 'Process' : 'Add'}
        </Button>
        <AutoCompleteCountry
        ref="destinationInput"
        />
      </div>
    );
  }
}

App.propTypes = {
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
