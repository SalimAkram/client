import React, { useState, useEffect } from "react"

import getCurrentUser from "../../services/getCurrentUser";
import UserProfile from "./profile/UserProfile";

const UserProfileContainer = () => {
  const [error, setError] = useState({})
  const [user, setUser] = useState({})
  const [rolls, setRolls] = useState([])
  const [setups, setSetups] = useState([])

  useEffect(() => {
    getCurrentUser()
    .then(body => {
      setUser(body)
      setRolls(body.rolls)
      setSetups(body.setups)
    })
    .catch(error => {
      setError(error)
    })
  }, [])
  
  return(
    <div>
      <UserProfile user={user} rolls={rolls} setups={setups} />
    </div>
  )
};

export default UserProfileContainer