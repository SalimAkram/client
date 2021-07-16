import React, { useState, useEffect }  from "react"
import { useParams, Link } from "react-router-dom"

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
      return (
        <div key={frame.id}>
          <li>aperature: f/{frame.aperature}</li>
          <li>shutterspeed: 1/{frame.shutterSpeed}</li>
          <li>exposure #{frame.frameNumber}</li>
          <li>notes: {frame.notes}</li>
          <li></li>
          <li>created at: {frame.createdAt}</li>
          <Link>delete this frame</Link><br/><br/>
        </div>
      );
    }))
  }

  let locationsArray;
  if(roll.locations) {
    locationsArray = roll.locations.map((location => {
      return(
        <div key={location.id}>
          <li>longitude: {location.longitude}</li>
          <li>latitude: {location.latitude}</li><br/>
        </div>
      )
    }))
  }

  return (
    <div>
      <div>
        <li>{roll.rollName}</li>
        <li>{roll.cameraSetup}</li>
        <li>{roll.cameraIso}</li>
        <li>{roll.film}</li>
      </div>
      <div>
        <div>
          <h3>
            Frames <Link to={`/rolls/${id}/frames/new`}>add a new frame</Link>
          </h3>
        </div>
        {framesArray}
      </div>
      <div>
        <h3>Locations</h3>
        {locationsArray}
      </div>
    </div>
  );
}

export default RollShow;