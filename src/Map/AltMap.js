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
      places: this.props.places
    }; //initialize initial state from props
  }

  componentDidMount() {
    const { places } = this.props
    var map = new Map(places);
    const socket = new Socket("//phoenixmaybackend.com/socket", {
    params: {user_id: "gpsmap"}
    });
    const channel = socket.channel("water_cooler:gps");
    socket.connect();
    channel.join()
      .receive("ok", resp => {
        console.log("Joined successfully ", resp)
      })
      .receive("error", resp => { console.log("Unable to join", resp) })

    channel.on("gps", payload => {
      map.set(payload.user,payload.data)
      console.log(payload.user, " ", payload.data,'the payload data')
      this.setState({places: map})

    })
  }

  render() {
    return (
      <GMap
        center={this.props.center}
        zoom={this.props.zoom}
        places={this.state.places}
      />
    );
  }
}

export default withScriptjs(withGoogleMap(MapWithMarker));
