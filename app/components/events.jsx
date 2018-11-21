import React, { Component } from "react";
/*import moment from "moment";*/
import PropTypes from 'prop-types';


export default class Events extends React.Component {

	constructor(props) {
    super(props);

    this.state = {
      time: moment().format("dd, Do MMMM, h:mm A"),
      events: [],
      
    };

  }
	
	componentDidMount = () => {
		this.getEvents();
	}
	
	
	getEvents() {
		
    let that = this;
	let x = this.props.wpObject3.calendarID;
    function start() {
		gapi.client
       .init({
       apiKey: that.props.wpObject3.googleAPIkey
	  
     })
	 .then(function() {
	
        return gapi.client.request({
			
		'path': `https://www.googleapis.com/calendar/v3/calendars/` + that.props.wpObject3.calendarID + `/events?maxResults=` + that.props.wpObject3.maxresults + `&orderBy=startTime&singleEvents=true&timeMin=${moment().toISOString()}&timeMax=${moment().add(30, "days").toISOString()}`
        });
	})
        .then(
		   response => {
            let events = response.result.items;
            let sortedEvents = events.sort(function(b, a) {
              return (
                moment(b.start.dateTime).format("YYYYMMDD") -
                moment(a.start.dateTime).format("YYYYMMDD")
              );
            });
            if (events.length > 0) {
              that.setState(
                {
                  events: sortedEvents,
                 
                }
              );
            } 

          },
          function(reason) {
		
            console.log(reason);
          }
		  
        );
    }
    gapi.load("client", start);
  }

  
	
		
	    render() {
    const { time, events } = this.state;
    const inputType = this.props.wprInput;

    let eventsList = events.map(function(event) {
		
	 
      return (
	  <div className="outerContainer" key={event.id}>
        <a 
          className="list-group-item"
          href={event.htmlLink}
          target="_blank"
        >
          <strong>{event.summary}{" "}</strong>
          
        </a>
		<div className="badge">
		  <div className="badge__time">
		   {moment(event.start.dateTime).format("L")}{" "} @ {moment(event.start.dateTime).format("h:mm a")} 
		   </div>
		{event.location} 
          </div>
		</div>

		
      );
	
    });

    let emptyState = (
      <div className="empty">

        <h3>
          No meetings are scheduled for the day. Create one by clicking the
          button below.
        </h3>
      </div>
    );

  
  
    return (
	
      <div className="container">
        
        <div className="upcoming-meetings">
           <div className="list-group">
             {events.length > 0 && eventsList}
       
          </div>
          <a
            className="primary-cta"
             href={"https://calendar.google.com/calendar?cid=" + this.props.wpObject3.calendarID }
            target="_blank"
          >
            +
          </a>
        </div>
      </div>
    );
  }

 
}

Events.propTypes = {
  wpObject3: PropTypes.object,
 };