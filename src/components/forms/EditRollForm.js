import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import getDropdownData from "../../services/getDropdownData";
import getRoll from "../../services/getRoll";
import editRoll from "../../services/editRoll";

import FormError from "../layout/FormError";

const EditRollForm = () => { 
  const [roll, setRoll] = useState({
    rollName: "",
    film: "",
    cameraSetup: "",
    weather: "",
    notes: "",
    cameraIso: "",
    loadDate: "",
    unloadDate: "",
  });
  const [filmsElemenetData, setFilmsElementData] = useState({ films: [] });
  const [cameraSetupsElementData, setCameraSetupsElementData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})
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
    getDropdownData()
    .then(body => {
      setFilmsElementData(body.films)
      setCameraSetupsElementData(body.cameraSetups)
    })
    .catch(error => {
      setError(error)
    })
  }, [])

  const handleInputChange = (event) => {
    event.preventDefault()
    setRoll({
      ...roll,
      [event.currentTarget.name]: event.currentTarget.value
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    validateInput(roll) 
    if (Object.keys(errors).length === 0) {
      editRoll(roll)
      .then(response => {
        if (response.ok) {
          setShouldRedirect(true)
        }
      })
      .catch(error => {
        setError(error)
      })
    }
  };

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

   const validateInput = (payload) => {
     setErrors({});
     const { rollName, film, cameraSetup, weather, notes, cameraIso, loadDate, unloadDate } =
       payload;
     let newErrors = {};
     if (rollName.trim() === "") {
       newErrors = {
         ...newErrors,
         rollName: "is required",
       };
     }
     setErrors(newErrors);
   };

   if (shouldRedirect) {
     return <Redirect to={`/rolls/${id}`}/>
   }

  return (
    <div className="form">
      <div className="form __roll">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name
              <input
                name="rollName"
                id="rollName"
                type="text"
                onChange={handleInputChange}
                value={roll.rollName || ""}
              />
              <FormError error={errors.rollName} />
            </label>
          </div>
          <div>
            <label>
              Film
              <select
                value={roll.film || ""}
                onChange={handleInputChange}
                name="film"
                id="film"
              >
                <option value=""></option>
                {filmsArray}
              </select>
            </label>
          </div>
          <div>
            <label>
              Camera Setup
              <select
                value={roll.cameraSetup || ""}
                onChange={handleInputChange}
                name="cameraSetup"
                id="cameraSetup"
              >
                <option value=""></option>
                {cameraSetupsArray}
              </select>
            </label>
          </div>
          <div>
            <label>
              Camera Iso
              <select
                value={roll.cameraIso || ""}
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
                value={roll.weather || ""}
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
                value={roll.loadDate || ""}
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
                value={roll.unloadDate || ""}
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
                value={roll.notes || ""}
              />
            </label>
          </div>
          <input type="submit" value="submit" className="button" />
        </form>
      </div>
    </div>
  );
};
  
export default EditRollForm
