import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



import Homepage from './homepage/Homepage';
import Profile from './profile/Profile';
import Folring from './Folring/Folring';
import Nav from './nav/Nav.js';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
// const RouteWithSubRoutes = (route) => (
//   <Route path={route.path} render={props => (
//     // pass the sub-routes down to keep nesting
//     <route.component {...props} routes={route.routes}/>
//   )}/>
// )

class RouteConfigExample extends Component {

 constructor(props) {
    super(props);
    this.state = {
      rooms: null
    }
  }
  
  componentDidMount() {
    window.socket.on('update_room', (room) => {
      console.log('receiving room state in homepage')
    });

    window.socket.on('send_all_rooms', (rooms) => {
      console.log('RECIEINV ROOMS')
      console.log(rooms)
      this.setState({rooms: rooms})
    });


  }


  render() {
    return (
        <Router>
          <div>
            <Nav />
            <Route exact path="/" component={Homepage} rooms={this.state.rooms}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/Folring" component={Folring}/>
          </div>
        </Router>
      )
  }
 
}

export default RouteConfigExample