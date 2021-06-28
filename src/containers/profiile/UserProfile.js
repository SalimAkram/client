import React, { useState, useEffect } from "react"

import getCurrentUser from "../../services/getCurrentUser";

import RollTile from "../../components/rolls/RollTile";

const UserProfile = () => {
  const [error, setError] = useState({})
  const [user, setUser] = useState({})
  const [rolls, setRolls] = useState([])
  const [setUps, setSetUps] = useState([])

  useEffect(() => {
    getCurrentUser()
    .then(body => {
      setUser(body)
      setRolls(body.rolls)
      setSetUps(body.setups)
    })
    .catch(error => {
      setError(error)
    })
  }, [])
  
  return(
    <div>
      <h4>{user.email}</h4>
      <RollTile rolls={rolls}/>
    </div>
  )
};

export default UserProfile