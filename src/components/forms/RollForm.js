import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import FormError from '../layout/FormError';

import addRoll from "../../services/addRoll";
import getDropdownData from '../../services/getDropdownData';
import clearForm from '../../services/clearForm';

const RollForm = () => {
  const [rollPayload, setRollPayload] = useState({
    rollName: "",
    film: "",
    cameraSetup: "",
    weather: "",
    notes: "",
    cameraIso: "",
    loadDate: "",
    unloadDate: ""
  });
  const [filmsElemenetData, setFilmsElementData] = useState({ films: [] })
  const [cameraSetupsElementData, setCameraSetupsElementData] = useState([])
  const [shouldRedirect, setShouldRedirect] =  useState(false)
  const [errors, setErrors] = useState({})
  const [error, setError] = useState({})

  useEffect(() => {
    getDropdownData()
    .then(body => {
      setCameraSetupsElementData(body.cameraSetups)
      setFilmsElementData(body.films)
    })
    .catch(error => {
      setError(error)
    })
  }, [])

  const handleInputChange = (event) => {
    event.preventDefault()
    setRollPayload({
      ...rollPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    validateInput(rollPayload)
    if(Object.keys(errors).length === 0) {
      addRoll(rollPayload)
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

  const validateInput = (payload) => {
    setErrors({});
    const { rollName, film, cameraSetup, weather, notes, cameraIso, loadDate, unloadDate } = payload
    let newErrors = {};
    if (rollName.trim() === "") {
      newErrors = {
        ...newErrors,
        rollName: "is required"
      }
    }
    setErrors(newErrors)
  }

  const clear = (event) => {
    event.preventDefault()
    setRollPayload(clearForm(rollPayload));
    setErrors({})
  }

  let filmsArray;
  if (filmsElemenetData.films) {
    filmsArray = filmsElemenetData.films.map((film) => {
      return (
        <option key={film.id} value={film.filmName}>
          {film.brand} {film.filmName}
        </option>
      );
    });
  }

  let cameraSetupsArray;
  if (cameraSetupsElementData) {
    cameraSetupsArray = cameraSetupsElementData.map((cameraSetup) => {
      return (
        <option
          key={cameraSetup.id}
          value={`${cameraSetup.cameraBrand} ${cameraSetup.cameraModel}`}
        >
          {cameraSetup.cameraBrand} {cameraSetup.cameraModel}
        </option>
      );
    });
  }

  if (shouldRedirect) {
    return <Redirect to="/profile" />
  }

  return (
    <div className="form">
      <div className="form __roll">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name
              <input
                name="rollName"
                id="rollName"
                type="text"
                onChange={handleInputChange}
                value={rollPayload.rollName}
              />
              <FormError error={errors.rollName} />
            </label>
          </div>
          <div>
            <label>Film
              <select value={rollPayload.film} onChange={handleInputChange} name="film" id="film">
                <option value=""></option>
                {filmsArray}
              </select>
            </label>
          </div>
          <div>
            <label>Camera Setup
              <select value={rollPayload.cameraSetup} onChange={handleInputChange} name="cameraSetup" id="cameraSetup">
                <option value=""></option>
                {cameraSetupsArray}
              </select>
            </label>
          </div>
          <div>
            <label>Camera Iso
              <select value={rollPayload.cameraIso} onChange={handleInputChange} name="cameraIso" id="cameraIso">
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
            <label>Weather
              <input
                name="weather"
                id="weather"
                type="text"
                onChange={handleInputChange}
                value={rollPayload.weather}
              />
            </label>
          </div>
          <div>
            <label>Start Date
              <input
                name="loadDate"
                id="loadDate"
                type="text"
                onChange={handleInputChange}
                value={rollPayload.loadDate}
              />
            </label>
          </div>
          <div>
            <label>End Date
              <input
                name="unloadDate"
                id="unloadDate"
                type="text"
                onChange={handleInputChange}
                value={rollPayload.unloadDate}
              />
            </label>
          </div>
          <div>
            <label>Notes
              <textarea
                name="notes"
                id="notes"
                rows="10"
                onChange={handleInputChange}
                value={rollPayload.notes}
              />
            </label>
          </div>
          <button onClick={clear} className="button">clear</button>
          <input type="submit" value="submit" className="button" />
        </form>
      </div>
    </div>
  );
};

export default RollForm;