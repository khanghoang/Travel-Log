import React, { PropTypes, Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from "lodash";
import DestinationListItem from '../components/DestinationListItem';

export default class UserDestinationPanel extends Component {

  onDestinationChange() {
    return function(destinationID) {
      console.log(destinationID);
    }
  }

  render() {

    var data = _.get(this.props, "destinations.data") || [];

    var panels =
      _.map(data, (user, i) =>
      <Panel key={i} collapsible header={user.name}>
      <ListGroup fill>
      {user.destinations.map((des, y) =>
        <DestinationListItem 
        key={y}
        destination={des}
        onDestinationCheckVisited={this.onDestinationChange()}
        onDestinationDelete={this.onDestinationChange()}
        />
      )}
      </ListGroup>
      </Panel>
      )

      return (
        <div>
        {panels}
        </div>
      );
  }
}

UserDestinationPanel.propTypes = {
  destinations: PropTypes.array.isRequired
};
