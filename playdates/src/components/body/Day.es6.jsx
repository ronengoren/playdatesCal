import React, { Component } from 'react';
import moment from 'moment';
import bem from 'bem-classname';
import {assign, find, times} from 'lodash';
import SpotifyPlayer from 'react-spotify-player';

import Slot from './Slot';
import {getDateTime, getStyle} from '../util';
import {ViewType} from '../constant';
import axios from 'axios';
import queryString from 'query-string';
import {spotify} from './spotify'

import Script from 'react-load-script'


export default class Day extends React.Component {
    startDiary = '08:00';
    endDiary = '20:00';

    static defaultProps = {
        view: 'landscape',
        timeSlot: 30,
        noHeader: false
    }
    constructor(props){
        let parsed = queryString.parse(location.search);
        let token = parsed.access_token;
        super(props);
        this.state = {
            track: null,
            token: token 
          
      
        }
        console.log("dfdf")
     console.log(token)
    }
   
 
    createSlot(key, booking, numberOfColumn, numberOfSlot, clickable = true) {
        const style = getStyle(this.props.view, numberOfColumn, numberOfSlot);
        return <Slot key={key}
            onClick={clickable ? this.props.onClick : undefined}
            canViewBooking={this.props.canViewBooking}
            size={this.props.size}
            style={style}
            {...booking} />
    }

    createBooking(start, end) {
        return {
            isBooked: false,
            startDate: start,
            endDate: end
        }
    }

    nextSlot(date) {
        return {
            startDate: date.clone(),
            endDate: date.clone().add(this.props.timeSlot, 'm')
        }
    }

    getBooking(currentSlot) {
        const booking = find(this.props.bookings, x => x.startDate.local().isBetween(currentSlot.startDate.local(), currentSlot.endDate.local(), null, '[)'));
        return booking ? Object.assign({}, booking, {
            startDate: booking.startDate.local(),
            endDate: booking.endDate.local()
        }) : undefined;
       
    }

    spotifyPlayer() {
        const play = ({
  spotify_uri,
  playerInstance: {
    _options: {
      getOAuthToken,
      id
    }
  }
}) => {
  getOAuthToken(access_token => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    });
  });
};

play({
  playerInstance: new Spotify.Player({ name: "..." }),
  spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
});
}
    
    componentDidMount()  {
        var day = this.props.date.format('DD')
        var month = this.props.date.format('MM')
        var year = this.props.date.format('YYYY')
        var min = year - 90
        var randomYear = Math.floor(Math.random() * (year - min + 1)) + min;
        var yearsago = year - randomYear
        var release_date_min = randomYear + month + day;
        // console.log("hello" + release_date_min)
        var release_date_max = randomYear + month + day;
        // console.log(day)
        // console.log(month)
        // console.log(year)
        // console.log(randomYear)
        // console.log(yearsago)
     
       

       
  
        axios.get('https://api.musixmatch.com/ws/1.1/track.search', {
            params: {
              apikey: "d2534efb46fbe28c49449d58f2018e9d",
              f_track_release_group_first_release_date_min: release_date_min,
              f_track_release_group_first_release_date_max: release_date_max,
              format: "JSON",
              timeout: 10000,
              headers:{
                'Access-Control-Allow-Origin':'*'
                },
              
    
            }
          })
      
          .then((res) => {
              this.setState(()=>{  
                  return {
                      songs: res.data
                  }
                  console.log(songs)
                 
              })
            const albums = res.data.message.body.track_list[5].track.album_name;
            const artistname = res.data.message.body.track_list[5].track.artist_name;
            const track = res.data.message.body.track_list[5].track.track_name;
            const first_release_date = res.data.message.body.track_list[5].track.first_release_date;
            var yearsago = year - randomYear
            const songsdata = res.data
            console.log(songsdata)
            this.setState({albums, artistname, track, first_release_date, yearsago});
            this.search()

     
          })
          .catch((error) => {
              
        });
    
      }

  

     
      search(){
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        console.log(accessToken)
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=album:' + this.state.albums + '%20track:' + this.state.track + '&type=track&limit=1' ;
        // console.log(FETCH_URL)
        // var accessToken = 'BQCB2U_j11KSeQf36hdnU7dyFt-BW1fSbVM49O3IjGSV0fUCB5bKoJVa9q_qM0iuyJs-cDJRZLHGpMU8gdWGKHx7C2V0gCd3Qkfm4ykTH32Enu_udann4cwElOTDzcTHuBNaYz4DEZxnyXh3LBsWXOrLyhj1-w'

        var myOptions = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
          }
          fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
          console.log(json)
        const spotifyTrack = json.tracks.items[0].external_urls.spotify;   
        const spotifyTrackLink = json.tracks.items[0].uri;   
        console.log(spotifyTrack)     
        console.log(spotifyTrackLink)     
       

        this.setState({ spotifyTrack ,spotifyTrackLink, accessToken});
        console.log({accessToken})     
        console.log(spotifyTrackLink)     
        
      })
      
      }

 


      
    isDayOff() {
        return this.props.timeSlice &&
            this.props.timeSlice.off &&
            this.props.timeSlice.start === this.startDiary &&
            this.props.timeSlice.end === this.endDiary;
    }

    isOff(slot) {
        if (this.props.timeSlice && this.props.timeSlice.off) {
            const startOff = getDateTime(this.props.date, this.props.timeSlice.start);
            const endOff = getDateTime(this.props.date, this.props.timeSlice.end);

            return slot.startDate.isBetween(startOff, endOff, null, '[)');
        }

        return false;
    }

    renderHeader() {
        if (this.props.view !== ViewType.Day) {
            if (this.props.header)
            {
                return (<div className='day__header'>{this.props.header}</div>)
            }
            else if (this.props.date) {
                return (
                    <div className='day__header'>
                        <div className='day__header--important'>{this.props.date.format('DD')}</div>
                        <div>{this.props.date.format('dddd')}</div>

                    </div>
                )
            }
        }

        return undefined;
    }

    render() {
    
        const playersize = "compact";
          const theme = 'black'; // or 'white'
          const view = 'coverart'; // or 'coverart'
        let  spotifyTrack = {
            spotifyTrack: ''
        }
        let trackname = {
            name: ''
          };
          if (this.state.track !== null) {
            trackname = this.state.track;
          }
        let slots = [];

        if (this.props.date) {
            const startDiary = getDateTime(this.props.date, this.startDiary);
            const endDiary = getDateTime(this.props.date, this.endDiary);

            const numberOfColumn = endDiary.diff(startDiary, 'minutes') / this.props.timeSlot;
            let currentSlot = this.nextSlot(startDiary);
            // console.log(currentSlot)
            if (this.isDayOff() || (!this.props.displayPast && this.props.date.isBefore(moment(), 'day'))) {
                return null;
            } else {
                let workStart = startDiary;
                let workEnd = endDiary;

                if (this.props.timeSlice && !this.props.timeSlice.off) {
                    workStart = getDateTime(this.props.date, this.props.timeSlice.start);
                    workEnd = getDateTime(this.props.date, this.props.timeSlice.end);
                }

                while (currentSlot.startDate.isBefore(workStart)) {
                    const numberOfSlot = workStart.isBefore(currentSlot.endDate)
                    ? workStart.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot
                    : 1;

                    if (this.props.view !== ViewType.Day) {
                        slots.push(this.createSlot(slots.length, {}, numberOfColumn, numberOfSlot));
                    }

                    currentSlot = this.nextSlot(numberOfSlot === 1 ? currentSlot.endDate : workStart);
                }

                while (currentSlot.startDate.isBefore(workEnd)) {
                    if (!this.props.displayPast && currentSlot.startDate.isBefore(moment())) {
                        if(this.props.view !== ViewType.Day) {
                            slots.push(this.createSlot(slots.length, {}, numberOfColumn, 1));
                        }

                        currentSlot = this.nextSlot(currentSlot.endDate);
                        continue;
                    }

                    // Check if slot match a off period
                    if (this.props.view !== ViewType.Day && this.isOff(currentSlot)) {
                        slots.push(this.createSlot(slots.length, {}, numberOfColumn, 1));
                        currentSlot = this.nextSlot(currentSlot.endDate);
                        continue;
                    }

                    let booking = this.getBooking(currentSlot);
                    if (booking) {
                        let numberOfSlot = 1;
                        if (this.props.view === ViewType.Day) {
                            slots.push(this.createSlot(slots.length, booking, numberOfColumn, 1));
                            currentSlot = this.nextSlot(booking.endDate);
                        } else {
                            if (booking.startDate.isAfter(currentSlot.startDate)) {
                                numberOfSlot = booking.startDate.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot;
                                const freeSlot = this.createBooking(currentSlot.startDate, booking.startDate);
                                slots.push(this.createSlot(slots.length, freeSlot, numberOfColumn, numberOfSlot));
                            }

                            numberOfSlot = booking.endDate.diff(booking.startDate, 'minutes') / this.props.timeSlot;
                            slots.push(this.createSlot(slots.length, booking, numberOfColumn, numberOfSlot));

                            if (booking.endDate.isBefore(currentSlot.endDate)) {
                                numberOfSlot = currentSlot.endDate.diff(booking.endDate, 'minutes') / this.props.timeSlot;
                                const freeSlot = this.createBooking(booking.endDate, currentSlot.endDate);
                                slots.push(this.createSlot(slots.length, freeSlot, numberOfColumn, numberOfSlot));
                                currentSlot = this.nextSlot(currentSlot.endDate);
                            } else {
                                currentSlot = this.nextSlot(booking.endDate);
                            }
                        }
                    } else {
                        const numberOfSlot = workEnd.isBefore(currentSlot.endDate)
                        ? workEnd.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot
                        : 1;

                        const endDate = numberOfSlot === 1 ? currentSlot.endDate : workEnd;
                        const freeSlot = this.createBooking(currentSlot.startDate,  endDate);
                        const isClickable = currentSlot.startDate.isSameOrAfter(moment());
                        slots.push(this.createSlot(slots.length, freeSlot, numberOfColumn, numberOfSlot, isClickable));

                        currentSlot = this.nextSlot(endDate);
                    }
                }

                while (currentSlot.endDate.isSameOrBefore(endDiary)) {
                    const numberOfSlot = currentSlot.endDate.isAfter(endDiary)
                    ? endDiary.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot
                    : 1;

                    if (this.props.view !== ViewType.Day) {
                        slots.push(this.createSlot(slots.length, {}, numberOfColumn, numberOfSlot));
                    }

                    currentSlot = this.nextSlot(numberOfSlot === 1 ? currentSlot.endDate : endDiary);
                }

                if (currentSlot.startDate.isBefore(endDiary)) {
                    const numberOfSlot = endDiary.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot;
                    slots.push(this.createSlot(slots.length, {}, numberOfColumn, numberOfSlot));
                }
            }
        }
       
        return (
            
            <div className='day'>
                {this.renderHeader()}
                <div className="container">
                <div className="musix">
                <p>This Song released today <span className="yearsago">{this.state.yearsago}</span> years ago!</p> 
                <p>Album: {this.state.albums}</p> 
                <p>Artist: {this.state.artistname}</p> 
                <p>Track: {this.state.track}</p> 
                </div>

                <div>

                     {/* <input type="text" 
              onChange={event => { this.setState({ query: event.target.value }) }}
            className="form-control" placeholder="Search for..." />
             <button 
              onClick={()=> this.search()}
               className="btn btn-default" type="button">Go!</button> */}
                </div>

 <div>
          <div className="spotifylink"> 
          <a href={this.state.spotifyTrack}>Listen to this song on Spotify</a>
          
           </div> <br/>
           <SpotifyPlayer
  uri={this.state.spotifyTrackLink}
  size={playersize}
  view={view}
  theme={theme}
// getOAuthToken={this.state.accessToken}
/>
        </div>
</div>
                <div className='day__details'>
                    {slots}
                </div>
            </div>
            
        );

    }
}

