import React, { useState } from 'react'

import FormError from '../layout/FormError';
import addRoll from "../../services/addRoll"
import { Redirect } from 'react-router';

const RollForm = () => {
  const [rollPayLoad, setRollPayload] = useState({
    rollName: "",
    film: "",
    cameraSetup: "",
    weather: "",
    notes: "",
    cameraIso: "",
    loadDate: "",
    unloadDate: "",
  });
  const [shouldRedirect, setShouldRedirect] =  useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (event) => {
    event.preventDefault()
    setRollPayload({
      ...rollPayLoad,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    debugger
    validateInput(rollPayLoad)
    if(Object.keys(errors).length === 0) {
      addRoll(rollPayLoad)
      .then(response => {
        if(response.ok) {
          response.json()
          .then(() => {
            setShouldRedirect(true)
          })
        }
      })
    }
  }

  if (shouldRedirect) {
    return <Redirect to="/profile" />
  }

  const validateInput = (payload) => {
    setErrors({});
    const { rollName, film, cameraSetup, weather, notes, cameraIso, loadDate, unloadDate } = payload
    let newErrors = {};
    if(rollName.trim() === "") {
      newErrors = {
        ...newErrors,
        rollName: "is required"
      }
    }
    setErrors(newErrors)
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name
              <input
                name="rollName"
                id="rollName"
                type="text"
                onChange={handleInputChange}
                value={setRollPayload.rollName}
              />
              <FormError error={errors.rollName} />
            </label>
          </div>
          <div>
            <label>
              Film
              <input
                // dynamically display the films that are in the database in a drop down menu. create a function that fetches all the films in the database
                name="film"
                id="film"
                type="text"
                onChange={handleInputChange}
                value={setRollPayload.film}
              />
            </label>
          </div>
          <div>
            <label>
              Camera Setup
              <input
                // dynamically display the setups that belong to the current user that are in the database in a drop down menu. create a function that fetches all the user setups from the database
                name="cameraSetup"
                id="cameraSetup"
                type="text"
                onChange={handleInputChange}
                value={setRollPayload.cameraSetup}
              />
            </label>
          </div>
          <div>
            <label>
              Camera Iso
              <select
                value={setRollPayload.cameraIso}
                onChange={handleInputChange}
                name="cameraIso"
                id="cameraIso"
              >
                <option value=""></option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600 </option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Weather
              <input
                name="weather"
                id="weather"
                type="text"
                onChange={handleInputChange}
                value={setRollPayload.weather}
              />
            </label>
          </div>
          <div>
            <label>
              Start Date
              <input
                name="loadDate"
                id="loadDate"
                type="text"
                onChange={handleInputChange}
                value={setRollPayload.loadDate}
              />
            </label>
          </div>
          <div>
            <label>
              End Date
              <input
                name="unloadDate"
                id="unloadDate"
                type="text"
                onChange={handleInputChange}
                value={setRollPayload.unloadDate}
              />
            </label>
          </div>
          <div>
            <label>
              Notes
              <textarea
                name="notes"
                id="notes"
                rows="10"
                onChange={handleInputChange}
                value={setRollPayload.notes}
              />
            </label>
          </div>
          <input type="submit" value="submit" className="button" />
        </form>
      </div>
    </div>
  );
};

export default RollForm;