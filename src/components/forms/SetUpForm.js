import React, { useState }from "react"

import FormError from "../layout/FormError";
import addSetUp from "../../services/addSetUp";
import { Redirect } from "react-router";
import clearForm from "../../services/clearForm";

const SetUpForm = (props) => {
  const [setUpPayload, setSetUpPayload] = useState ({
    cameraBrand: "",
    cameraModel: "",
    lenseType: "",
    lenseBrand: "",
    lenseModel: "",
    focalLength: "",
    lenseAperature: "",
    notes: "",
    focusType: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (event) => {
    event.preventDefault()
    setSetUpPayload({
      ...setUpPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  };  

  const handleSubmit = (event) => {
    event.preventDefault()
    validateInput(setUpPayload)
    if (Object.keys(errors).length === 0) {
      addSetUp(setUpPayload)
      .then(response => {
        if(response.ok) {
          setShouldRedirect(true)
        }
      })
      .catch(error => {
        setError(error)
      })
    }
  };

  const validateInput = (payload) => {
    setErrors({});
    const { cameraBrand, cameraModel, lenseType, lenseBrand, lenseModel, focalLength, lenseAperature, notes, focusType  } = payload;
    let newErrors = {};
    if (cameraBrand.trim() === "") {
      newErrors = {
        ...newErrors,
        cameraBrand: "is required"
      };
    }

    if (cameraModel.trim() === "") {
      newErrors = {
        ...newErrors,
        cameraModel: "is required"
      };
    }
    setErrors(newErrors);
  };

  const clear = (event) => {
    event.preventDefault()
    setSetUpPayload(clearForm(setUpPayload));
    setErrors({})
  }

  if (shouldRedirect) {
    return <Redirect to="/profile" />;
  }
   
  return(
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Camera Brand
              <input 
                name="cameraBrand"
                id="cameraBrand"
                type="text"
                onChange={handleInputChange}
                value={setUpPayload.cameraBrand}
              />
              <FormError error={errors.cameraBrand} />
            </label>
          </div>
          <div>
            <label>Camera Model
              <input 
                name="cameraModel"
                id="cameraModel"
                type="text"
                onChange={handleInputChange}
                value={setUpPayload.cameraModel}
              />
              <FormError error={errors.cameraModel} />
            </label>
          </div>
          <div>
            <label>Lense Type
              <input 
                name="lenseType"
                id="lenseType"
                type="text"
                onChange={handleInputChange}
                value={setUpPayload.lenseType}
              />
            </label>
          </div>
          <div>
            <label>Lense Brand
              <input 
                name="lenseBrand"
                id="lenseBrand"
                type="text"
                onChange={handleInputChange}
                value={setUpPayload.lenseBrand}
              />
            </label>
          </div>
          <div>
            <label>Lense Model
              <input 
                name="lenseModel"
                id="lenseModel"
                type="text"
                onChange={handleInputChange}
                value={setUpPayload.lenseModel}
              />
            </label>
          </div>
          <div>
            <label>Focal Length
              <input 
                name="focalLength"
                id="focalLength"
                type="text"
                onChange={handleInputChange}
                value={setUpPayload.focalLength}
              />
            </label>
          </div>
          <div>
            <label>Lense Aperature
              <input 
                name="lenseAperature"
                id="lenseAperature"
                type="text"
                onChange={handleInputChange}
                value={setUpPayload.lenseAperature}
              />
            </label>
          </div>
          <div>
            <label>notes
              <textarea 
                name="notes"
                id="notes"
                rows="10"
                onChange={handleInputChange}
                value={setUpPayload.notes}
              />
            </label>
          </div>
          <div>
            <label>Focus Type
              <select value={setUpPayload.focusType} onChange={handleInputChange} name="focusType" id="focusType">
                <option value=""></option>
                <option value="range finder">Range Finder</option>
                <option value="view finder">View Finder</option>
              </select>
            </label>
          </div>
          <button onClick={clear} className="button">clear</button>
          <input type="submit" value="submit" className="button" />
        </form>
      </div>
    </div>
  )
};

export default SetUpForm;