import React from 'react';
const Appointment = ({appointment, onRemoveEvent=f=>f, editingEvent=f=>f}) =>
    <div className="single-Event" key={appointment.id}>
           <h4>title: {appointment.title}</h4>
            <p>body: {appointment.body}</p>
            <p>date: {appointment.date}</p>
        <button onClick={() => onRemoveEvent(appointment.id)}>Erase</button>
        <button onClick={() => editingEvent(appointment.id)}>Edit</button>

        <hr/>
    </div>
export default Appointment;