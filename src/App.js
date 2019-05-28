import React from 'react';
import './App.css';
import User from './User/User';
//import Main from './Map/Main';
import AltMap from './Map/AltMap';


const numberOfUsers = [0,1,2,3, 4, 5, 6, 7, 8, 9, 10];

var myMap = new Map();


myMap.set("Center", {latitude: 30.240006, longitude: -97.720439});

//"AIzaSyAIFqYRABatpGZdmVjjg4CJzKnQy86OFsg"

function App() {
  return (
<div className="listUsers">
    <div style={{'width': '100%'}}>
      <h3>An explanation of what this app is doing.</h3>
      <ul>
        <li>Choosing an activity demonstrates phoenix presence.  Under "Who else is doing what I am doing?" list the users doing the same activity.</li>
        <li>Under show my location, pressing "send gps" demonstrates the use of phoenix channels. (You can only submit gps points if you are doing an activity) GPS coordinates are being sent to the map.</li>
        <li>Below the map you can get the closest point to center.  You can try multiple times.  Every time points change map, click on "GetNearestPoint" to get the current nearest point to center.</li>

      </ul>
    </div>
    {numberOfUsers.map(item => <User key={`user${item}`} usernumber={item}/>)}
    <AltMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAIFqYRABatpGZdmVjjg4CJzKnQy86OFsg&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{ lat: 30.240006, lng: -97.720439 }}
        zoom={14}
        places={myMap}
      />
  </div>
  );
}

export default App;
