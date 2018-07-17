import React, { Component } from 'react';
class EditEventForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.appointment.id,
            title: this.props.appointment.title,
            body: this.props.appointment.body,
            startDate: this.props.appointment.startDate
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        const { id, title, body } = this.state;
        this.props.editEvent(id, title, body);
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            <input  name="title"
                    type="text"
                    placeholder="Title..."
                    value={this.state.title}
                    onChange={this.handleChange} />
            <input  name="body"
                    type="text"
                    placeholder="Body..."
                    value={this.state.body}
                    onChange={this.handleChange} />
            <button>Update Event</button>
        </form>  
        )
    }
}
export default EditEventForm;