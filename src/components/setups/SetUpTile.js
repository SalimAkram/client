import React from "react"
import { Link } from "react-router-dom"

const SetUpTile = (props) => {
  return(
    <div>
      <Link to={`/setups/${props.id}`}>
        {props.cameraBrand}  {props.cameraModel}
      </Link>
    </div>
  )
};

export default SetUpTile;