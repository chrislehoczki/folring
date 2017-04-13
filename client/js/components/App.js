import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Homepage from './homepage/Homepage';
import Profile from './profile/Profile';
import Folring from './folring/Folring';
import Nav from './nav/Nav';
import Login from './login/Login';
import SignupModal from './login/SignupModal';
import RouteWrapper from './animations/RouteWrapper';

class App extends Component {

 constructor(props) {
    super(props);
    this.state = {
      rooms: null,
      user: null
    }

  }

  componentDidMount() {
    // window.socket.on('update_room', (room) => {
    //   const newRooms = { ...this.state.rooms };
    //   newRooms[room.id] = room;
    //   this.setState({rooms: newRooms});
    // });

    // window.socket.on('send_all_rooms', (rooms) => {
    //   this.setState({rooms: rooms})
    // });

    // window.socket.on('user', (user) => {
    //   this.setState({user: user});
    // });

  }

  render() {
    return (
          <div>
            <Nav />
            <Route exact path="/" component={Login}/>
            <Route path="/signup" component={SignupModal} />
            <Route path="/rooms" component={Homepage} />
            <Route path="/room/:roomId?" component={Folring} />
            <Route path="/profile" component={Profile}/>
            <Route path="/folring" component={Folring} />
          </div>
      )
  }
 
}


export default App;