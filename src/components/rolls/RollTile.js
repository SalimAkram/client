import React from "react"

const RollTile = (props) => {

  const rollsTileArray = props.rolls.map((roll) => {
    <div key={roll.id}>
      {roll.name}
    </div>
  })
 
  
  return (
    <div>
      {rollsTileArray}
    </div>
  )
};

export default RollTile;