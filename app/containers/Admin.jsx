import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Notice from '../components/notice';

import fetchWP from '../utils/fetchWP';
export default class Admin extends Component {
  constructor(props) {
    super(props);

   this.state = {
	        googleAPIkey: '',
			calendarID: '',
			maxresults: 0,
			notice: false,
      
    };
	this.fetchWP = new fetchWP({
      restURL: this.props.wpObject1.api_url,
      restNonce: this.props.wpObject1.api_nonce,
    });
   
 // Get the currently set email address from our /admin endpoint and update the email state accordingly
    this.getSetting();
  }
  
  
  
  getSetting = () => {
	 this.fetchWP.get( 'admin' )
    .then(
	 //(json) => console.log( 'json', json ),
	  (json) => this.setState(  {
		  
		googleAPIkey: json.value.googleAPIkey,
		calendarID: json.value.calendarID,
        maxresults:json.value.maxresults

      }),
	 (err) => console.log( 'error', err )
    );
	
  };
 
	updateSetting = () => {
		
		
		
		var result = {
		  googleAPIkey: this.state.googleAPIkey,
		  calendarID: this.state.calendarID,
		  maxresults: this.state.maxresults
		}
	
		
		 
	this.fetchWP.post( 'admin', { gValues: result})
		
    .then(
    
	
	  (json) => this.processOkResponse(json, 'saved'),
      (err) => console.log('error', err)
    );
  }
	handleSave = (event) => {
		//console.dir( this.state);
	 event.preventDefault();
	 this.updateSetting();
		
		
		
	};
	

	
	
	
	updateInput = (event) => {
		
		const {name, value} = event.target;
		

   
  
 this.setState({
      
       
	   [name]: value,
      
        
      });
  
	
  
  
  
	}
 clearNotice = () => {
    this.setState({
      notice: false,
    });
  }
  processOkResponse = (json, method) => {
    if (json.success) {
      this.setState({
          notice: {
          type: 'success',
          message: `Setting ${method} successfully.`,
        }
      });
    } else {
      this.setState({
        notice: {
          type: 'error',
          message: `Setting was not ${method}.`,
        }
      });
    }
  }
  render() {
    let notice;

   if ( this.state.notice ) {
      notice = <Notice notice={this.state.notice} onDismissClick={this.clearNotice} />
    }


    return (
       <div className="wrap">
	   {notice}
	    <form>
			<h1> Google Calendar Seetings</h1>
			<label>
          Google API Key:  
            <input 
              type="text"
			  name="googleAPIkey"
              value={this.state.googleAPIkey}
             onChange={this.updateInput}
            />
          </label>
		 
			<label>
          Calendar ID:  
            <input
              type="text"
			  name="calendarID"
              value={this.state.calendarID}
             onChange={this.updateInput}
            />
          </label>
	  
		  <label>
          Max Events Shown:  
            <input className="number"
              type="text"
			  name="maxresults"
              value={this.state.maxresults}
             onChange={this.updateInput}
            />
          </label>
		 
		  <button
            id="save"
            className="button button-primary"
         onClick={this.handleSave}
          >Save</button>
		</form>
      </div>
    );
  }
}



Admin.propTypes = {
  wpObject1: PropTypes.object,
 };