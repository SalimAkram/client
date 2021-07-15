import React, { useState, useEffect, Fragment }  from "react"
import { useParams } from "react-router-dom"

import getRoll from "../../services/getRoll"

const RollShow = (props) => {
  console.log('rendering roll show page....')
  console.log(props)
  const [roll, setRoll] = useState({})
  const [error, setError] = useState({})
  const { id } = useParams()

  useEffect(() => {
    getRoll(id)
    .then(body => {
      setRoll(body.roll)
    })
    .catch(error => {
      setError(error)
    })
  }, [])

  console.log(roll)

  let framesArray;
  if(roll.frames) {
    framesArray = roll.frames.map((frame => {
      return(
        <Fragment>
          <li>aperature: f/{frame.aperature}</li>
          <li>shutterspeed: 1/{frame.shutterSpeed}</li>
          <li>exposure #{frame.frameNumber}</li>
          <li>notes: {frame.notes}</li>
          <li></li>
          <li>created at: {frame.createdAt}</li><br/>
        </Fragment>
      )
    }))
  }

  let locationsArray;
  if(roll.locations) {
    locationsArray = roll.locations.map((location => {
      return(
        <Fragment>
          <li>longitude: {location.longitude}</li>
          <li>latitude: {location.latitude}</li><br/>
        </Fragment>
      )
    }))
  }

  return(
    <div>
      <div>
        <li>{roll.rollName}</li>
        <li>{roll.cameraSetup}</li>
        <li>{roll.cameraIso}</li>
        <li>{roll.film}</li>
      </div>
      <div>
        <h3>Frames</h3>
        {framesArray}
      </div>
      <div>
        <h3>Locations</h3>
        {locationsArray}
      </div>
    </div>
  )
}

export default RollShow;