import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Events from '../components/events';

export default class Shortcode extends Component {
	constructor(props) {
		super(props);
	
		
            
	
		  }

	  
  render() {
	     
	  
    return (
      <div>
  			<Events  wpObject3= {this.props.wpObject2.future_data} wprInput="shortCode" />
	      </div>
   
    );
  }
}

Shortcode.propTypes = {
  wpObject2: PropTypes.object
};