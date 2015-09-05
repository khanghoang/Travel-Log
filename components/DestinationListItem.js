import React, { PropTypes } from 'react';
import { ListGroupItem, Input, Button } from 'react-bootstrap';

require('./DestinationListItem.less');

export default class UserDestinationPanel extends ListGroupItem {
  render() {
      const checkbox = <Input type='checkbox' />
      const destinationsClass = this.props.destination.visited ? "strike" : "";
      const buttonDelete = <Button className="destinations-delete-button" bsSize='xsmall'>Delete</Button>;
      return (
        <div>
        <input type='checkbox' onChange={this.props.onDestinationChange.bind(this)}>
        </input>
        <span className={destinationsClass}>{this.props.destination.name}</span>
        {buttonDelete}
        </div>
      );
  }
}
