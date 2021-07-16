import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";

import FormError from "../layout/FormError";

import addFrame from "../../services/addFrame";

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
    // validateInput(framePayload) will address this error handling logic later
    if (Object.keys(errors).length === 0) {
      addFrame(framePayload, id)
      .then(response => {
        if(response.ok) {
          setShouldRedirect(true)
        }
      })
    }
  }

 if (shouldRedirect) {
   return <Redirect to={`/rolls/${id}`} />;
 }
  // const validateInput = (payload) => {
  //   setErrors({})
  //   const {aperature, shutterSpeed, frameNumber, notes}
  // }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Aperature
              <input
                name="aperature"
                id="aperature"
                type="integer"
                onChange={handleInputChange}
                value={setFramePayload.aperature}
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
                value={setFramePayload.shutterSpeed}
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
                value={setFramePayload.frameNumber}
              />
              <FormError error={errors.frameNumber} />
            </label>
          </div>
          <div>
            <label>Notes
              <textarea
                name="notes"
                id="notes"
                rows="10"
                onChange={handleInputChange}
                value={setFramePayload.notes}
              />
              <FormError error={errors.notes} />
            </label>
          </div>
          <input type="submit" value="submit" className="button" />
        </form>
      </div>
    </div>
  );
};

export default FrameForm;