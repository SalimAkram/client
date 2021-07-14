import React from "react"

const SetUpTile = (props) => {
  return(
    <div>
      <p>
        {props.cameraBrand}  {props.cameraModel}
      </p>
      <p>
        {props.lenseAperature} | {props.lenseBrand} | {props.lenseModel} | {props.lenseType} 
      </p>
      <p>
        {props.focalLength} | {props.focusType}
      </p>
        {props.notes}
    </div>
  )
};

export default SetUpTile;