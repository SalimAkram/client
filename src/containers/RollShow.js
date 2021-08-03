import React, { useState, useEffect }  from "react"
import { useParams, Link, Redirect } from "react-router-dom"

import Frames from "../components/frames/Frames"
import AddressForm from "../components/forms/AddressForm"
import CustomMap from "../components/map/CustomMap";

import getRoll from "../services/getRoll"
import deleteframe from "../services/deleteFrame"
import LeafMap from "../components/map/LeafMap";

const RollShow = () => {
  console.log('rendering roll show page....')
  const [roll, setRoll] = useState({})
  const [error, setError] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [rollId, setRollId] = useState({})
  const [frameId, setFrameId] = useState({})
  const [display, setDisplay] = useState(false)

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

  const addLocationHandleClick = () => {
    setDisplay(true)
  }

  const hideForm = (event) => {
    event.preventDefault()
    setDisplay(false)
  }

  const searchField = (
    <AddressForm rollId={id} hideForm={hideForm} />
  );
  
  if (shouldRedirect) {
    if (rollId & frameId) {
      const path = `/rolls/${rollId}/frames/${frameId}/edit`
      return <Redirect to={path} />
    }
    return <Redirect to="/profile" />
  }

  console.log("roll that is set in state", roll)
  
  return (
    <div className="roll__show">
      <div className="roll__show__container">
        <div className="roll__show__container__title">
          <h2>{roll.rollName} </h2>
          <li>camera: {roll.cameraSetup}</li>
          <li>camera Iso: {roll.cameraIso}</li>
          <li>film: {roll.film}</li>
          <Link className="button" to={`/rolls/${id}/edit`}>
            edit roll
          </Link>
        </div>
        <div className="roll__show__container__frames">
          <div className="roll__show__container__frames__title">
            <h5>Frames</h5>
            <Link className="button" to={`/rolls/${id}/frames/new`}>
              add a new frame
            </Link>
          </div>
          <Frames
            frames={roll.frames}
            rollId={id}
            deleteFrame={deleteFrameHandleClick}
            editFrame={editFrameHandleClick}
          />
        </div>
        <div className="roll__show__container__location__title">
          <h5>Locations</h5>
          <button className="button" onClick={addLocationHandleClick}>
            update current location
          </button>
          {display ? searchField : null}
        </div>
        <div className="roll__show__container__map__container">
          <div className="roll__show__container__map">
            <LeafMap locations={roll.locations} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RollShow;