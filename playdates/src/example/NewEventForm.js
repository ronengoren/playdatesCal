import React from 'react';
import './style.css';


const NewEventForm = ({onNewEvent = f => f}) => {
    let title, body
    const submit = e => {
        e.preventDefault()
        onNewEvent(title.value, body.value)
        title.value = ''
        body.value = ''
        title.focus()
        
    }

    return (
        <form onSubmit={submit} className="newEventForm">
            <input  ref={input => title = input}
                    type="text"
                    placeholder="Title..." required /> <br/>
            <input  ref={input => body = input}
                    type="text"
                    placeholder="Body..." required />
            <button className="example_d">Add Event</button>
        </form>
    )
}

export default NewEventForm;
