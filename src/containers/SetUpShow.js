import React, { useState, useEffect } from "react"
import { useParams, Redirect } from "react-router-dom"

import getSetUp from "../services/getSetUp";
import deleteSetUp from "../services/deleteSetUp";

const SetUpShow = (props) => {
  console.log('rendering setup show page....')
  console.log(props)
  const [setUp, setSetUp] = useState({})
  const [error, setError] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false)
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
  
  const deleteHandleClick = (id) => {
    deleteSetUp(id)
    .then(response => {
      if (response.ok) {
        setShouldRedirect(true)
      }
    })
    .catch(error => {
      setError(error)
    })
  }

  if (shouldRedirect) {
    return <Redirect to="/profile" />;
  }
  console.log(setUp)

  return(
    <div>
      <li>{setUp.cameraBrand} {setUp.cameraModel}</li>
      <li>{setUp.focalLength}</li>
      <li> {setUp.lenseType} {setUp.lenseModel}</li>
      <li>{setUp.lenseAperature} {setUp.lenseBrand}</li><br/>
      <p>notes</p>
      <li>{setUp.notes}</li>
      <a onClick={()=> deleteHandleClick(id)}>delete this setup</a>
    </div>
  );
}; 

export default SetUpShow;