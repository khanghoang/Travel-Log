import React, { PropTypes, Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from "lodash";

export default class UserDestinationPanel extends Component {
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
        <ListGroupItem key={y}>{des.name}</ListGroupItem>
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
