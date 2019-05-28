import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from "react-google-maps";
import { Socket } from 'phoenix-socket';
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


const Markers = ({ places }) => {
  let arr = [];
  places.forEach((value, key) => {
    //console.log(value)
    arr.push(
      <Marker key={key} label={`${key}`} position={{ lat: value.latitude, lng: value.longitude }} />
    );
  });
  return arr;
};

const GMap = ({ places, zoom, center }) => {
  return (
    <GoogleMap defaultZoom={zoom} defaultCenter={center}>
      <Markers places={places} />
    </GoogleMap>
  );
};

class MapWithMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: this.props.places,
      channel: null,
      nearest: null
    }; //initialize initial state from props
    this.getNearestPoint = this.getNearestPoint.bind(this);
  }

  // /phoenixmaybackend.com/socket
  componentDidMount() {
    const { places } = this.props
    var map = new Map(places);
    const socket = new Socket("ws://127.0.0.1:4000/socket", {
    params: {user_id: "gpsmap"}
    });
    const channel = socket.channel("water_cooler:gps");

    socket.connect();
    channel.join()
      .receive("ok", resp => {
        console.log("Joined successfully ", resp)
      })
      .receive("error", resp => { console.log("Unable to join", resp) })

    this.setState({channel: channel})

    channel.on("gps", payload => {
      map.set(payload.user,payload.data)
      console.log(payload.user, " ", payload.data,'the payload data')
      this.setState({places: map})

    })
  }

  getNearestPoint() {
    this.state.channel.push("nearest")
      .receive("ok", resp => {
        console.log("this is the nearest response ", resp)
        this.setState({nearest: resp.response[1][0][0]})
      })
      .receive("error", resp => { console.log("error nearest ", resp) })
  }

  render() {
    return (
      <>
      <GMap
        center={this.props.center}
        zoom={this.props.zoom}
        places={this.state.places}
      />
      <button onClick={this.getNearestPoint}>
        GetNearestPoint
      </button>
      {this.state.nearest && <h3>The nearest point(user) is: user:{this.state.nearest}</h3>}
    </>
    );
  }
}

export default withScriptjs(withGoogleMap(MapWithMarker));
