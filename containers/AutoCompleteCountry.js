var React = require('react');
import {Component} from 'react';
import $ from 'jquery';

export default class AutoCompleteCountry extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div>
      <div ref="typeahead" id="remote">
      <input className="typeahead" type="text" placeholder="Oscar winners for Best Picture" />
      </div>
      </div>
    )

  }

}
