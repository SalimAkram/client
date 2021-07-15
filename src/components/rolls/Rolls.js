import React from "react"

import RollTile from "./RollTile";

const Rolls = (props) => {
  console.log('rendering rolls component')
  console.log(props)
  const rollTilesArray = props.rolls.map((roll => {
    return(
      <RollTile
        key={roll.id}
        id={roll.id}
        rollName={roll.rollName}
      />
    )
  }))

  return (
    <div>
      {rollTilesArray}
    </div>
  )
};

export default Rolls;