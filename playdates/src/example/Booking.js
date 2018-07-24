import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-responsive-ux-container';
import moment from 'moment';
import axios from 'axios';
import NewEventForm from './NewEventForm'
import {Calendar} from '../index';
import Event from './Event'
import EditEventForm from './EditEventForm'

import '../../node_modules/react-responsive-ux-container/dist/react-responsive-container.css';
import './style.css';


class Booking extends React.Component {
    onSlotChoosenBound = this.onSlotChoosen.bind(this);
    onCloseBound = this.onClose.bind(this);
    onSubmitBound = this.onSubmit.bind(this);
    
    constructor(props) {
        super(props);

        this.state = {
            bookings: props.bookings || [],
            booking: props.booking,
            show: false,
            appointments: [{
                title: "", 
                body: "",
                startDate: ""
            } ],
            editingEventId: null
        };
        

        this.addNewEvent = this.addNewEvent.bind(this)
        this.removeEvent = this.removeEvent.bind(this)
        this.editingEvent = this.editingEvent.bind(this)
        this.editEvent = this.editEvent.bind(this)
    }
    componentDidMount() {
        axios.get('https://appointmentsapi.herokuapp.com/api/v1/appointments')
        .then(response => {
            console.log(response)
            // startDate = this.startDate.format("ddd MMM D YYYY, h:mm:ss")
            // console.log(response.data[0].startDate)
            this.setState({
                appointments: response.data
            })
            console.log(response.data)

        })
        .catch(error => console.log(error))
    }
    

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }
    addNewEvent(title, body, startDate) {
        startDate = this.state.booking.startDate.format("ddd MMM D YYYY, h:mm:ss")
        // console.log(startDate)
        // console.log("date")

        // console.log(startDate)

        axios.post( 'https://appointmentsapi.herokuapp.com/api/v1/appointments', 
        { appointment: {title, body, startDate} })
        .then(response => {
            console.log(response)
            const appointments = [ ...this.state.appointments, response.data ]
            this.setState({appointments})
            
        })
        .catch(error => {
            console.log(error)
        })
    }
    removeEvent(id) {
        axios.delete( 'https://appointmentsapi.herokuapp.com/api/v1/appointments/' + id )
        .then(response => {
            const appointments = this.state.appointments.filter(
                appointment => appointment.id !== id
            )
            this.setState({appointments})
        })
        .catch(error => console.log(error))
    }
    editingEvent(id) {
        this.setState({
            editingEventId: id
        })
    }
    editEvent(id, title, body) {
        axios.put( 'https://appointmentsapi.herokuapp.com/api/v1/appointments/' + id, { 
            appointment: {
                title, 
                body
            } 
        })
        .then(response => {
            console.log(response);
            const appointments = this.state.appointments;
            appointments[id-1] = {id, title, body}
            this.setState(() => ({
                appointments, 
                editingEventId: null
            }))
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className='example'>
                {
                    this.state.show &&
                    (
                        <Container type='Modal' visible={this.state.show}>
                            <div className='loader__container'>
                                <div className='content__header'>
                                    <b>New Booking for Date:  {this.state.booking.startDate.format('MM-DD-YYYY HH:mm a')}</b>
                                    {/* {console.log(this.state.booking.startDate.format('MM-DD-YYYY'))} */}
                                    <button type="button" className='content__header__button' onClick={this.onCloseBound}>×</button>
                                </div>
                                <div>
                                 
                                   {/* <h1>Events for the date {this.state.booking.startDate.format('MM-DD-YYYY')}</h1>  */}
                                   {this.state.appointments.map( appointment => {
                                       console.log("1")
                                    //    console.log(this.state.booking.startDate.format("ddd MMM D YYYY, h:mm:ss"))
                                       console.log("2")
                                    //    console.log(appointment.startDate)
                                       var start = moment(appointment.startDate).utc().format('ddd MMM D YYYY, h:mm:ss');
                                        console.log(start)
                                        if ( start === this.state.booking.startDate.format("ddd MMM D YYYY, h:mm:ss") ) {

                                    return (
                                      
                                        <Event 
                                        appointment={appointment} 
                                        key={appointment.id} 
                                        onRemoveEvent={this.removeEvent} 
                                        editingEvent={this.editingEvent} 

                                        />
                                  )
                                }
                                if ( start ==! this.state.booking.startDate.format("ddd MMM D YYYY, h:mm:ss") ) {

                                    return (
                                      <div>
                                        <h1></h1>
                                        </div>
                                  )
                                }
                                
                                      })}
                                      
                                      
                                </div>
                            </div>
                            <NewEventForm onNewEvent={this.addNewEvent} startDate={this.state.booking.startDate}/>

                        </Container>
                    )
                }

                <Calendar bookings={this.state.bookings}
                    timeSlot={this.props.timeSlot}
                    timeSlices={this.props.timeSlices}
                    timeExceptions={this.props.timeExceptions}
                    canViewBooking={true}
                    onSlotChoosen={this.onSlotChoosenBound}>
                </Calendar>
            </div>
        );
    }

    onClose(e) {
        e.preventDefault();

        this.setState({ show: false });
    }

    onSlotChoosen(booking) {
        this.setState({ show: true, booking });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            bookings: this.state.bookings.concat([this.state.booking]),
            booking: undefined,
            show: false
        });
    }
}

export default Booking;
