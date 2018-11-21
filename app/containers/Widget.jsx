import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Events from '../components/events';

export default class Widget extends Component {
	constructor(props) {
		super(props);
		
	}
  render() {
    return (
      <div>
        <h4 className="widget-title">{this.props.wpObject2.title}</h4>
		<Events  wpObject3= {this.props.wpObject2.future_data} wprInput="widget" />
      </div>
    );
  }
}

Widget.propTypes = {
  wpObject2: PropTypes.object
};