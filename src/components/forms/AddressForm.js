import React, { useState } from "react";

import FormError from "../layout/FormError"

import getCoords from "../../services/getCoords";
import clearForm from "../../services/clearForm";
import addLocation from "../../services/addLocation";

const AddressForm = (props) => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: ""
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (event) => {
    event.preventDefault();
    setAddress({
      ...address,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const coords = getCoords(address)
    .then(coords => {
      if (coords) {
        addLocation(coords, props.rollId);
      }
    })
    .catch(error => {
      setErrors(error)
    })
  };

  const cancel = (event) => {
    event.preventDefault()
    setAddress(clearForm(address));
    props.hideForm(event)
  }

  return (
    <div className="input-group">
      <span className="input-group-label">Nearest Address</span>
      <input
        className="input-group-field"
        name="street"
        id="street"
        type="text"
        placeholder="36 guest street"
        onChange={handleInputChange}
        value={address.street}
      />
      <input
        className="input-group-field"
        name="city"
        id="city"
        type="text"
        placeholder="brighton"
        onChange={handleInputChange}
        value={address.city}
      />
      <input
        className="input-group-field"
        name="state"
        id="state"
        type="text"
        placeholder="MA"
        onChange={handleInputChange}
        value={address.state}
      />
      <div className="input-group-button">
        <input onClick={handleSubmit} type="submit" value="submit" className="button" />
        <button onClick={cancel} className="button">
          cancel
        </button>
      </div>
      <FormError error={errors.aperature} />
    </div>
  );
};
  
export default AddressForm