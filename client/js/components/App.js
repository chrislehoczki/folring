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



class RouteConfigExample extends Component {

 constructor(props) {
    super(props);
    this.state = {
      rooms: null,
      user: null
    }
  }

  componentDidMount() {
    window.socket.on('update_room', (room) => {
      console.log('receiving room state in homepage')
      // should sort update global rooms here
    });

    window.socket.on('send_all_rooms', (rooms) => {
      console.log('RECEIVING ROOMS IN APP')
      this.setState({rooms: rooms})
    });

    window.socket.on('user', (user) => {
      console.log('USER RECEIVED', user)
      this.setState({user: user});
    });


  }


  render() {

    const HomepageWrapper = (props) => {
        return <Homepage {...props} rooms={this.state.rooms} user={this.state.user} />
    }

    const ProfileWrapper = (props) => {
       return <Profile {...props} user={this.state.user} />
    }

    const FolringWrapper = (props) => {
      return <Folring history={props.history} user={this.state.user} />
    }


    return (
        <Router>
          <div>
            <Nav user={this.state.user}/>
            <Route exact path="/" component={HomepageWrapper}/>
            <Route path="/profile" component={ProfileWrapper}/>
            <Route path="/Folring" component={FolringWrapper}/>
          </div>
        </Router>
      )
  }
 
}





export default RouteConfigExample