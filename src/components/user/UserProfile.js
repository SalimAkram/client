import React from "react"

import Rolls from "../rolls/Rolls";
import SetUps from "../setups/SetUps"

const UserProfile = (props) => {

  return (
    <div className="user__profile__container">
      <Rolls rolls={props.rolls} />
      <SetUps setups={props.setups} />
    </div>
  );
};

export default UserProfile;