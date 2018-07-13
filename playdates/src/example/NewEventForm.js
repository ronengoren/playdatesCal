import React from 'react';


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
        <form onSubmit={submit}>
            <input  ref={input => title = input}
                    type="text"
                    placeholder="Title..." required />
            <input  ref={input => body = input}
                    type="text"
                    placeholder="Body..." required />
            <button>Add Event</button>
        </form>
    )
}

export default NewEventForm;
