import React from 'react';
import ChooseActivity from './ChooseActivity';
import ShowCurrentActivity from './ShowCurrentActivity';
import ShowSimilarUsers from './ShowSimilarUsers';
import { Socket } from 'phoenix-socket';
import { Presence } from '../phoenix.js';
import randomLocation from 'random-location'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: null,
      socket: null,
      presenceState:[],
      current: "Nothing",
      presences: {},
    };

    // This binding is necessary to make `this` work in the callback
    this.joinRoom = this.joinRoom.bind(this);
    this.sendGps = this.sendGps.bind(this);
    this.message = this.message.bind(this);
  }

  joinRoom(data) {
    console.log(data, 'this is data')
    //console.log("I am running again for some reason")
    if (this.state.channel) {
      this.state.channel.leave()
    }
    const { socket } = this.state;
    this.setState({current: data})
    const channel = socket.channel(`water_cooler:${data}`);
    this.setState({channel: channel})
    socket.connect();
    channel.join().receive("ok", resp => {
      //console.log("Joined successfully????" + this.props.usernumber, resp)
      })
      .receive("error", resp => { console.log("Unable to join", this.props.usernumber, resp) })

    ////// this is needed if you are recieving messages from other "users"
    // channel.on(`room:${data}:new_message`, payload => {
    //     if (payload.name !== this.props.usernumber + " is " + this.state.current){
    //       //console.log(payload)
    //       console.log("user "+ this.props.usernumber + " got the message")
    //     }
    //
    // })

    channel.on("presence_diff", (response) => {
      let presences = Presence.syncDiff(this.state.presences, response);
      this.setState({presences: presences})
      let participants = Presence.list(presences, listBy)
      this.setState({presenceState: participants})
    })

    channel.on("presence_state", (response) => {
      let presences = Presence.syncState(this.state.presences, response);
      this.setState({presences: presences})
      let participants = Presence.list(presences, listBy)
      this.setState({presenceState: participants})
    })

    let listBy = (id, {metas: [first, ...rest]}) => {
      // first.count = rest.length + 1 // count of this user's presences
      // first.id = id

      return first
    }
  }

  message(data) {
    this.state.channel.push("shout", {data, user: this.props.usernumber})
      .receive("ok", resp => {
        //console.log(resp.response, " this is the response")
      })
      .receive("error", resp => { console.log("error", resp) })
  }

  //phoenixmaybackend.com/socket

  componentDidMount() {
    const socket = new Socket("//phoenixmaybackend.com/socket", {
    params: {user_id: `user #${this.props.usernumber}`}
    });
    this.setState({socket})
  }

  sendGps() {
    const P = {
      latitude: 30.240006,
      longitude: -97.720439
    }

    const R = 1000 // meters

    setInterval(
      () => this.message(randomLocation.randomCirclePoint(P, R)),
      5000
    );
  }

  render() {
    return (
      <div className="User">
        <ShowCurrentActivity current={this.state.current} user={this.props.usernumber}/>
        <ChooseActivity join={this.joinRoom}/>
        <ShowSimilarUsers users={this.state.presenceState}/>
        <hr/>
        <h5>Show my location</h5>
        {this.state.channel && <button onClick={this.sendGps}>
          Send GPS
        </button>}
      </div>
    );
  }
}

export default User;
