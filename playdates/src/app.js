import React from 'react';
import ReactDOM from 'react-dom';
import {ViewType} from './index';
import Booking from './example/Booking';
import {appointments, bookings, timeSlot, timeSlices, timeExceptions} from './example/datas';

ReactDOM.render(
    <Booking 
    services={[{id: 1, name: 'Service 1'}]}
        bookings={bookings}
        appointments={appointments}
        timeSlot={timeSlot}
        timeExceptions={timeExceptions}
        canViewBooking={false} />,
    document.getElementById('root')
);
