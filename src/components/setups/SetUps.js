import React from "react"

import SetUpTile from "./SetUpTile";

const SetUps = (props) => {
  console.log('rendering setups component')
  console.log(props) 
  const setUpsTilesArray = props.setups.map((setup => {
    return(
      <SetUpTile 
        key={setup.id}
        id={setup.id}
        cameraBrand={setup.cameraBrand}
        cameraModel={setup.cameraModel}
        focalLength={setup.focalLength}
        focusType={setup.focusType}
        lenseAperature={setup.lenseAperature}
        lenseBrand={setup.lenseBrand}
        lenseModel={setup.lenseModel}
        lenseType={setup.lenseType}
        notes={setup.notes}
      />
    )
  }))

  return(
    <div className="setup__container">
      {setUpsTilesArray}
    </div>
  )
};

export default SetUps;