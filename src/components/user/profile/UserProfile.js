import React from "react"

import Rolls from "../../rolls/Rolls";
import SetUps from "../../setups/SetUps"

const UserProfile = (props) => {

  return(
    <div>
      <div>
        <h1>
          ROLLS
        </h1>
        <Rolls rolls={props.rolls} />
      </div>
      <div>
        <h1>
          SET UPS
        </h1>
        <SetUps setups={props.setups} />
      </div>
    </div>
  )
};

export default UserProfile;