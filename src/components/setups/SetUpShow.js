import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import getSetUp from "../../services/getSetUp";

const SetUpShow = (props) => {
  console.log('rendering setup show page....')
  console.log(props)
  const [setUp, setSetUp] = useState({})
  const [error, setError] = useState({});
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
  
  console.log(setUp)

  return(
    <div>
      <li>{setUp.cameraBrand} {setUp.cameraModel}</li>
      <li>{setUp.focalLength}</li>
      <li> {setUp.lenseType} {setUp.lenseModel}</li>
      <li>{setUp.lenseAperature} {setUp.lenseBrand}</li><br/>
      <p>notes</p>
      <li>{setUp.notes}</li>
    </div>
  );
}; 

export default SetUpShow;