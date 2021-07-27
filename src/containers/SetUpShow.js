import React, { useState, useEffect } from "react"
import { useParams, Redirect, Link } from "react-router-dom"

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
      if (body.error) {
        setShouldRedirect(true)
      } else {
        console.log("setting state for the setup coming from the database");
        setSetUp(body.setUp)
      }
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
    <div className="setup">
      <li>{setUp.cameraBrand} {setUp.cameraModel}</li>
      <li>{setUp.focalLength}</li>
      <li> {setUp.lenseType} {setUp.lenseModel}</li>
      <li>{setUp.lenseAperature} {setUp.lenseBrand}</li><br/>
      <p>notes</p>
      <li>{setUp.notes}</li>
      <button className="button" onClick={()=> deleteHandleClick(id)}>delete this setup</button>
      <Link className="button" to={`/setups/${id}/edit`}>edit setup</Link>
    </div>
  );
}; 

export default SetUpShow;