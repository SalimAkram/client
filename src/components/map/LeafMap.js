import React from "react"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import getCenterPosition from "../../services/getCenterPosition";

const LeafMap = (props) => {

  let startPosition = [42.361145, -71.057083];
  let markersArray;
  if (props.locations) {
    startPosition = getCenterPosition(props.locations)
    markersArray = props.locations.map((location) => {
      return (
        <div key={location.id}>
          <Marker position={[location.latitude, location.longitude]} >
            <Popup>
              display all of the frames that exist at this location. <br /> 
            </Popup>
          </Marker>
        </div>
      );
    })
  }

  return (
    <MapContainer id="mapid" center={[42.361145, -71.057083]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markersArray}
    </MapContainer>
  );
};
  
export default LeafMap