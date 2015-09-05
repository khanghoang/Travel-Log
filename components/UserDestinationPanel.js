import React, { PropTypes, Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from "lodash";
import DestinationListItem from '../components/DestinationListItem';

export default class UserDestinationPanel extends Component {

  onDestinationChange() {
    return function() {
      console.log('aaaa');
    }
  }

  render() {
    const testData = [
      {
        username: "evie",
        destinations: [
          {
            name: "Saigon",
            visited: true
          },
          {
            name: "Saigon",
            visited: true
          },
          {
            name: "Saigon",
            visited: false
          }
        ]
      },
      {
        username: "khang",
        destinations: [
          {
            name: "Saigon",
            visited: true
          },
          {
            name: "Saigon",
            visited: true
          },
          {
            name: "Saigon",
            visited: false
          }
        ]
      },
    ];

    var panels =
      _.map(testData, (user, i) =>
      <Panel key={i} collapsible header={user.username}>
      <ListGroup fill>
      {user.destinations.map((des, y) =>
        <DestinationListItem 
        key={y}
        destination={des}
        onDestinationChange={this.onDestinationChange()}
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
