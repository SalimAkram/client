import React, { useState, useEffect }  from "react"
import { useParams, Link, Redirect } from "react-router-dom"

import Frames from "../components/frames/Frames"
import Locations from "../components/locations/Locations"
import Map from "../components/map/Map"

import getRoll from "../services/getRoll"
import deleteframe from "../services/deleteFrame"

const RollShow = () => {
  console.log('rendering roll show page....')
  const [roll, setRoll] = useState({})
  const [error, setError] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [rollId, setRollId] = useState({})
  const [frameId, setFrameId] = useState({})
  const { id } = useParams()

  useEffect(() => {
    getRoll(id)
    .then(body => {
      if (body.error) {
       setShouldRedirect(true)
      } else {
        console.log('setting state for the roll coming from the database')
        setRoll(body.roll)
      }
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

  const editFrameHandleClick = (rollId, frameId) => {
    setRollId(rollId)
    setFrameId(frameId)
    setShouldRedirect(true)
  }
  
  if (shouldRedirect) {
    if (rollId & frameId) {
      const path = `/rolls/${rollId}/frames/${frameId}/edit`
      return <Redirect to={path} />
    }
    return <Redirect to="/profile" />
  }

  console.log("roll that is set in state", roll)
  
  return (
    <div>
      <div>
        <h2>{roll.rollName} <Link className="button" to={`/rolls/${id}/edit`}>edit roll</Link></h2>
        <li>{roll.cameraSetup}</li>
        <li>{roll.cameraIso}</li>
        <li>{roll.film}</li>
      </div>
      <div>
        Frames <br/> 
        <Link className="button" to={`/rolls/${id}/frames/new`}>add a new frame</Link> **
      </div>
      <div>
        <Frames 
          frames={roll.frames} 
          rollId={id} 
          deleteFrame={deleteFrameHandleClick} 
          editFrame={editFrameHandleClick}
        />
      </div>
      <div>
        Locations   
      </div>
      <div>
        <Locations locations={roll.locations}/>
        <Map />
      </div>
    </div>
  );
}

export default RollShow;