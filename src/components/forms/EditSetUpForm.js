import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import getSetUp from "../../services/getSetUp";
import editSetUp from "../../services/editSetUp"

import FormError from "../layout/FormError";

const EditSetUpForm = (props) => {
  const [setUp, setSetUp] = useState({
    cameraBrand: "",
    cameraModel: "",
    lenseType: "",
    lenseBrand: "",
    lenseModel: "",
    focalLength: "",
    lenseAperature: "",
    notes: "",
    focusType: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] =  useState({})
  const [error, setError] =  useState({})
  const { id } = useParams()
 
  useEffect(() => {
    getSetUp(id)
    .then(body => {
      setSetUp(body.setUp)
    })
    .catch(error => {
      setError(error)
    })
  }, [])

  const handleInputChange = (event) => {
    event.preventDefault()
    setSetUp({
      ...setUp,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    validateInput(setUp)
    if (Object.keys(errors).length === 0) {
      editSetUp(setUp)
      .then(response => {
        if (response.ok) {
          setShouldRedirect(true)
        }
      })
      .catch(error => {
        setError(error)
      })
    }
  }

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

  if (shouldRedirect) {
    return <Redirect to={`/setups/${id}`} />;
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Camera Brand
              <input
                name="cameraBrand"
                id="cameraBrand"
                type="text"
                onChange={handleInputChange}
                value={setUp.cameraBrand || ""}
              />
              <FormError error={errors.cameraBrand} />
            </label>
          </div>
          <div>
            <label>
              Camera Model
              <input
                name="cameraModel"
                id="cameraModel"
                type="text"
                onChange={handleInputChange}
                value={setUp.cameraModel || ""}
              />
              <FormError error={errors.cameraModel} />
            </label>
          </div>
          <div>
            <label>
              Lense Type
              <input
                name="lenseType"
                id="lenseType"
                type="text"
                onChange={handleInputChange}
                value={setUp.lenseType || ""}
              />
            </label>
          </div>
          <div>
            <label>
              Lense Brand
              <input
                name="lenseBrand"
                id="lenseBrand"
                type="text"
                onChange={handleInputChange}
                value={setUp.lenseBrand || ""}
              />
            </label>
          </div>
          <div>
            <label>
              Lense Model
              <input
                name="lenseModel"
                id="lenseModel"
                type="text"
                onChange={handleInputChange}
                value={setUp.lenseModel || ""}
              />
            </label>
          </div>
          <div>
            <label>
              Focal Length
              <input
                name="focalLength"
                id="focalLength"
                type="text"
                onChange={handleInputChange}
                value={setUp.focalLength || ""}
              />
            </label>
          </div>
          <div>
            <label>
              Lense Aperature
              <input
                name="lenseAperature"
                id="lenseAperature"
                type="text"
                onChange={handleInputChange}
                value={setUp.lenseAperature || ""}
              />
            </label>
          </div>
          <div>
            <label>
              notes
              <textarea
                name="notes"
                id="notes"
                rows="10"
                onChange={handleInputChange}
                value={setUp.notes || ""}
              />
            </label>
          </div>
          <div>
            <label>
              Focus Type
              <select
                value={setUp.focusType || ""}
                onChange={handleInputChange}
                name="focusType"
                id="focusType"
              >
                <option value=""></option>
                <option value="range finder">Range Finder</option>
                <option value="view finder">View Finder</option>
              </select>
            </label>
          </div>
          <input type="submit" value="submit" className="button" />
        </form>
      </div>
    </div>
  );
};
  
export default EditSetUpForm