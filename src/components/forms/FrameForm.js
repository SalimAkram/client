import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";

import FormError from "../layout/FormError";

import addFrame from "../../services/addFrame";
import clearForm from "../../services/clearForm";

const FrameForm = () => {
  const [framePayload, setFramePayload] = useState({
    aperature: "",
    shutterSpeed: "",
    frameNumber: "",
    notes: ""
  });
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})
  const { id } = useParams()

  const handleInputChange = (event) => {
    event.preventDefault()
    setFramePayload({
      ...framePayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    validateInput(framePayload)
    if (Object.keys(errors).length === 0) {
      addFrame(framePayload, id)
      .then(response => {
        if(response.ok) {
          setShouldRedirect(true)
        }
      })
    }
  }

  const clear = (event) => {
    event.preventDefault()
    setFramePayload(clearForm(framePayload))
    setErrors({})
  }

  const validateInput = (payload) => {
    setErrors({})
    const {aperature, shutterSpeed, frameNumber, notes} = payload
    let newErrors = {};
    if (aperature.trim() === "") {
      newErrors = {
        ...newErrors,
        aperature: "is required"
      }
    }

    if (shutterSpeed.trim() === "") {
      newErrors = {
        ...newErrors,
        shutterSpeed: "is required"
      }
    }
    setErrors(newErrors)
  }

 if (shouldRedirect) {
   return <Redirect to={`/rolls/${id}`} />;
 }

  return (
    <div className="form">
      <div className="form __frame">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Aperature
              <input
                name="aperature"
                id="aperature"
                type="integer"
                onChange={handleInputChange}
                value={framePayload.aperature}
              />
              <FormError error={errors.aperature} />
            </label>
          </div>
          <div>
            <label>Shutter Speed
              <input
                name="shutterSpeed"
                id="shutterSpeed"
                type="integer"
                onChange={handleInputChange}
                value={framePayload.shutterSpeed}
              />
              <FormError error={errors.shutterSpeed} />
            </label>
          </div>
          <div>
            <label>FrameNumber
              <input
                name="frameNumber"
                id="frameNumber"
                type="integer"
                onChange={handleInputChange}
                value={framePayload.frameNumber}
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
                value={framePayload.notes}
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

export default FrameForm;