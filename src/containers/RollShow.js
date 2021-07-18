import React, { useState, useEffect }  from "react"
import { useParams, Link, Redirect } from "react-router-dom"

import Frames from "../components/frames/Frames"
import Locations from "../components/locations/Locations"

import getRoll from "../services/getRoll"
import deleteframe from "../services/deleteFrame"

const RollShow = () => {
  console.log('rendering roll show page....')
  const [roll, setRoll] = useState({})
  const [error, setError] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    getRoll(id)
    .then(body => {
      console.log('setting state')
      setRoll(body.roll)
    })
    .catch(error => {
      setError(error)
    })
  }, [])

  const deleteFrameHandleClick = (rollId, frameId) => {
    deleteframe(rollId, frameId)
    .then(response => {
      if (response.ok) {
        setShouldRedirect(true)
      }
    })
    .catch(error => {
      setError(error)
    }) 
  };
  
  if (shouldRedirect) {
    return <Redirect to="/profile" />
  }

  console.log("roll that is set in state", roll)
  
  return (
    <div>
      <div>
        <h5>{roll.rollName}</h5>
        <li>{roll.cameraSetup}</li>
        <li>{roll.cameraIso}</li>
        <li>{roll.film}</li>
      </div>
      <div>
        <h5>
          Frames <Link to={`/rolls/${id}/frames/new`}>add a new frame</Link>
        </h5>
        <Frames frames={roll.frames} rollId={id} deleteFrame={deleteFrameHandleClick} /><br/>
      </div>
      <div>
        <h5>
          Locations
        </h5>
        <Locations locations={roll.locations}/>
      </div>
    </div>
  );
}

export default RollShow;