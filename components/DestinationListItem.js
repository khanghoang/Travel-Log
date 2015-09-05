import React, { PropTypes } from 'react';
import { ListGroupItem, Input, Button } from 'react-bootstrap';

require('./DestinationListItem.less');

export default class UserDestinationPanel extends ListGroupItem {
  onCheckVisited() {
    this.props.onDestinationCheckVisited(this.props.destination._id);
  }

  onCheckDelete() {
    this.props.onDestinationDelete(this.props.destination._id);
  }

  render() {
      const destinationsClass = this.props.destination.visited ? "strike" : "";
      const buttonDelete = <Button className="destinations-delete-button" bsSize='xsmall' onClick={this.onCheckDelete.bind(this)}>Delete</Button>;
      return (
        <div>
        <input type='checkbox' onChange={this.onCheckVisited.bind(this)}>
        </input>
        <span className={destinationsClass}>{this.props.destination.name}</span>
        {buttonDelete}
        </div>
      );
  }
}
