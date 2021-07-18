import React from "react"

const LocationTile = (props) => {
  return (
    <div>
      <li>longitude: {props.longitude}</li>
      <li>latitude: {props.latitude}</li>
      <br />
    </div>
  );
};
  
export default LocationTile