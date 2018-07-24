import React from 'react';
import moment from 'moment';

import { ViewType } from '../constant';
import DateSelector from './DateSelector';
import ViewSelector from './ViewSelector';
import {getSizeModifier} from '../util';
import queryString from 'query-string';




export default class CalendarHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: props.view || ViewType.Month,
            date: props.date || moment(),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.date.isSame(nextProps.date)) {
            this.setState({ date: nextProps.date });
        }

        if (this.state.view !== nextProps.view) {
            this.setState({ view: nextProps.view });
        }
    }

    componentDidMount() {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        if (!accessToken)

        return;
        fetch('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        }).then(response => response.json())
        .then(data => this.setState({
            user: {
                name: data.display_name

            }
        }))
   
    
    
    }

    

    render() {
        let SpotifyUser = this.state.user
        var divStyle = {
            color: 'white',
            fontWeight: 'bold',
            fontSize: '30px',
            paddinhTop: '20px'
          };
        const sizeModifier = 'rbc-header' + getSizeModifier(this.props.size);
        return (
            <div className="playdates">
                <h1>PLAYD<span className="stronglogo" style={divStyle}>ates</span></h1>
        {this.state.user ?
          <h1 
        //   style={{...defaultStyle, 'font-size': '54px'}}
          >
            Hey there {this.state.user.name}
            
          </h1>
          
          
         
         : <button onClick={() => {
            window.location = window.location.href.includes('localhost') 
              ? 'https://playdates-calendar.herokuapp.com/login' 
              : 'https://spotify-api-auth.herokuapp.com/login' }
          }
          >Sign in with Spotify</button>
        }
      
  
            <div className={'rbc-header ' + sizeModifier}>
                <DateSelector view={this.state.view}
                              date={this.state.date}
                              change={this.props.dateChanged}
                              pastAvailable={this.props.pastAvailable}
                              size={this.props.size} />

                <ViewSelector view={this.state.view}
                              change={this.props.viewChanged}
                              resources={this.props.resources['view']}
                              size={this.props.size} />
            </div>
            </div>
        );
    }
}
