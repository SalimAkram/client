import React, { useState, useEffect }  from "react"
import { useParams, Link, Redirect } from "react-router-dom"

import Frames from "../components/frames/Frames"
import Locations from "../components/locations/Locations"
import Map from "../components/map/Map"
import FormError from "../components/layout/FormError";

import getRoll from "../services/getRoll"
import deleteframe from "../services/deleteFrame"
import addLocation from "../services/addLocation"
import getCoords from "../services/getCoords"
import clearForm from "../services/clearForm"

const RollShow = () => {
  console.log('rendering roll show page....')
  const [roll, setRoll] = useState({})
  const [error, setError] = useState({})
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [rollId, setRollId] = useState({})
  const [frameId, setFrameId] = useState({})
  const [display, setDisplay] = useState(false)
  const [address, setAddress] = useState({
    address: ""
  })
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

  const handleInputChange = (event) => {
    event.preventDefault()
    setAddress({
      ...address,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const coords = getCoords(address)
    if (coords) {
      addLocation(coords)
    } else {
      setError()
    }
  }

  const clear = (event) => {
    event.preventDefault()
    setLocation(clearForm(address))
    setDisplay(false)
    setErrors({})
  }

  const searchField = (
    <div className="input-group">
      <span className="input-group-label">Nearest Address</span>
      <input
        className="input-group-field"
        name="address"
        id="address"
        type="integer"
        placeholder="36 guest street, brighton"
        onChange={handleInputChange}
        value={address.value}
      />
      <div className="input-group-button">
        <input onClick={handleSubmit} type="submit" value="submit" className="button" />
        <button onClick={clear} className="button">
          cancel
        </button>
      </div>
      <FormError error={errors.aperature} />
    </div>
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
          <h2>{roll.rollName}{" "}</h2>
          <li>camera: {roll.cameraSetup}</li>
          <li>camera Iso: {roll.cameraIso}</li>
          <li>film: {roll.film}</li>
          <Link className="button" to={`/rolls/${id}/edit`}>edit roll</Link>
        </div>
        <div className="roll__show__container__frames">
          <div className="roll__show__container__frames__title">
            <h5>Frames</h5>
            <Link className="button" to={`/rolls/${id}/frames/new`}>add a new frame</Link>
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
          <button className="button" onClick={addLocationHandleClick}>add a new address</button>
          {display ? searchField : null}
        </div>
        <div className="roll__show__container__map__container">
          {/* <Locations locations={roll.locations}/> */}
          <Map locations={roll.locations} />
        </div>
      </div>
    </div>
  );
}

export default RollShow;