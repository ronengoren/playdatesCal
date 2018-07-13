import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-responsive-ux-container';
import moment from 'moment';
import axios from 'axios';
import NewEventForm from './NewEventForm'
import {Calendar} from '../index';

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
                date: ""
            } ]
        };
        

        this.addNewEvent = this.addNewEvent.bind(this)
    }
    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/appointments.json')
        .then(response => {
            console.log(response)
            this.setState({
                appointments: response.data
            })
        })
        .catch(error => console.log(error))
    }
    

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }
    addNewEvent(title, body, date) {
        date = this.state.booking.startDate.format('YYYY-MM-DD')
        console.log("date" + date)
        axios.post( 'http://localhost:3001/api/v1/appointments', 
        { appointment: {title, body, date} })
        .then(response => {
            console.log(response)
            const appointments = [ ...this.state.appointments, response.data ]
            this.setState({appointments})
        })
        .catch(error => {
            console.log(error)
        })
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
                                    New Booking for date:  {this.state.booking.startDate.format('MM-DD-YYYY')}
                                    {console.log(this.state.booking.startDate.format('MM-DD-YYYY'))}
                                    <button type="button" className='content__header__button' onClick={this.onCloseBound}>×</button>
                                </div>
                                <NewEventForm onNewEvent={this.addNewEvent} date={this.date} />
                                <div>
                                 
                                   <h1>events for the day of {this.state.booking.startDate.format('MM-DD-YYYY')}</h1> 
                                   {this.state.appointments.map( appointment => {
                                    return (
                                  <div className="single-list" key={appointment.id}><br/>
                                   New Booking for date:  {this.state.booking.startDate.format('MM-DD-YYYY')}
                                   <h4>title: {appointment.title}</h4>
                                  <p>body: {appointment.body}</p>
                                  <p>date: {appointment.date}</p>
                                 </div>
                                  )
                                      })}
                                </div>
                            </div>
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
