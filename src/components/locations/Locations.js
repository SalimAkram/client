import React from "react"

import LocationTile from "./LocationTile"

const Locations = (props) => {
  console.log('rendering locations component...')
  console.log('location props', props)
  
  let locationsArray;
  if (props.locations) {
    locationsArray = props.locations.map((location) => {
      return (
        <div key={location.id}>  
          <LocationTile 
            longitude={location.longitude}
            latitude={location.latitude}
          />
        </div>
      );
    });
  }
  return(
    <div>
      {locationsArray}
    </div>
  )
};
  
export default Locations