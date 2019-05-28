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
    <p>Test update</p>
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
