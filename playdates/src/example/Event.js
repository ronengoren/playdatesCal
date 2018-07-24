import React from 'react';
import moment from 'moment';

const Appointment = ({appointment, onRemoveEvent=f=>f, editingEvent=f=>f}) =>
    <div className="single-Event" key={appointment.id}>
           <h4>Title: {appointment.title}</h4>
            <p>Description: {appointment.body}</p>
            {/* <p>Date: {appointment.startDate}</p> */}
        <button onClick={() => onRemoveEvent(appointment.id)}>Erase</button>
        <button onClick={() => editingEvent(appointment.id)}>Edit</button>

        <hr/>
    </div>
export default Appointment;