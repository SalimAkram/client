import React, {useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import FormError from "../layout/FormError";

import getFrame from "../../services/getFrame";
import clearForm from "../../services/clearForm";
import editFrame from "../../services/editFrame";

const EditFrameForm = () => {
  const [frame, setFrame] = useState({
    aperature: "",
    shutterSpeed: "",
    frameNumber: "",
    notes: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] =  useState({})
  const [error, setError] =  useState({})
  const { id, frameId } = useParams() 

  useEffect(() => {
    getFrame(id, frameId)
    .then(body => {
      setFrame(body.frame)
    })
    .catch(error => {
      setError(error)
    })
  }, [])

  const handleInputChange = (event) => {
    event.preventDefault();
    setFrame({
      ...frame,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateInput(frame);
    if (Object.keys(errors).length === 0) {
      editFrame(frame)
      .then(response => {
        if (response.ok) {
          setShouldRedirect(true);
        }
      });
    }
  };

  const clear = (event) => {
    event.preventDefault();
    setFrame(clearForm(frame));
    setErrors({});
  };

  const validateInput = (payload) => {
    setErrors({});
    const { aperature, shutterSpeed, frameNumber, notes } = payload;
    
    let newErrors = {};
    if (aperature.toString().trim() === "") {
      newErrors = {
        ...newErrors,
        aperature: "is required",
      };
    }

    if (shutterSpeed.trim() === "") {
      newErrors = {
        ...newErrors,
        shutterSpeed: "is required",
      };
    }
    setErrors(newErrors);
  };

  if (shouldRedirect) {
    return <Redirect to={`/rolls/${id}`} />;
  }

  return (
    <div className="form">
      <div className="form __frame">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Aperature
              <input
                name="aperature"
                id="aperature"
                type="integer"
                onChange={handleInputChange}
                value={frame.aperature || ""}
              />
              <FormError error={errors.aperature} />
            </label>
          </div>
          <div>
            <label>
              Shutter Speed
              <input
                name="shutterSpeed"
                id="shutterSpeed"
                type="integer"
                onChange={handleInputChange}
                value={frame.shutterSpeed || ""}
              />
              <FormError error={errors.shutterSpeed} />
            </label>
          </div>
          <div>
            <label>
              FrameNumber
              <input
                name="frameNumber"
                id="frameNumber"
                type="integer"
                onChange={handleInputChange}
                value={frame.frameNumber || ""}
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
                value={frame.notes || ""}
              />
            </label>
          </div>
          <button onClick={clear} className="button">
            clear
          </button>
          <input type="submit" value="submit" className="button" />
        </form>
      </div>
    </div>
  );
};
  
export default EditFrameForm