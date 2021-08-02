import React, { useState, useEffect } from "react"

import getCurrentUser from "../services/getCurrentUser";
import UserProfile from "../components/user/UserProfile";

const UserProfileContainer = () => {
  const [error, setError] = useState({})
  const [user, setUser] = useState({ user: {}, rolls: [], setups: [] })

  useEffect(() => {
    getCurrentUser()
    .then(body => {
      setUser(body)
    })
    .catch(error => {
      setError(error)
    })
  }, [])

  return(
    <div className="user__profile">
      <UserProfile user={user} rolls={user.rolls} setups={user.setups} />
    </div>
  )
};

export default UserProfileContainer