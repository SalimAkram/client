import React from "react"
import { Link } from "react-router-dom"

const RollTile = (props) => {  
  return (
    <div className="roll__tile">
      <Link to={`rolls/${props.id}`}>
        {props.rollName}
      </Link>
    </div>
  )
};

export default RollTile;