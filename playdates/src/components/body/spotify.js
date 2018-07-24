import React, { Component } from 'react';

import queryString from 'query-string';

// var client_id = 'f9c5bffb89904a7c85852a414fcf44fd'; // Your client id
// var client_secret = '3f8b6573751140f2a1c65300e8d63e83'; // Your secret
// var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
// window.onSpotifyWebPlaybackSDKReady = () => {
//     // console.log(window.location.search);
//     let parsed = queryString    .parse(window.location.search);
//     let token = parsed.access_token;
//     // console.log("dfdf")
//     console.log(token)
//   const player = new Spotify.Player({
//     name: 'PLAYDates Player',
//     getOAuthToken: cb => { cb(token); },
//     spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',

//   });


//   // Error handling
//   player.addListener('initialization_error', ({ message }) => { console.error(message); });
//   player.addListener('authentication_error', ({ message }) => { console.error(message); });
//   player.addListener('account_error', ({ message }) => { console.error(message); });
//   player.addListener('playback_error', ({ message }) => { console.error(message); });

//   // Playback status updates
//   player.addListener('player_state_changed', state => { console.log(state); });

//   // Ready
//   player.addListener('ready', ({ device_id }) => {
//     console.log('Ready with Device ID', device_id);
//   });

//   // Not Ready
//   player.addListener('not_ready', ({ device_id }) => {
//     console.log('Device ID has gone offline', device_id);
//   });

//   // Connect to the player!
//   player.connect().then(success => {
//     if (success) {
//         window.Spotify = Spotify;
//         console.log('The Web Playback SDK successfully connected to Spotify!');
//     }
//   })

    
//   }