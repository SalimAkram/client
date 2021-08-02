import React from "react"

import RollTile from "./RollTile";

const Rolls = (props) => {
  console.log('rendering rolls component...')
  console.log('rolls props', props)
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
    <div className="roll__container">
      {rollTilesArray}
    </div>
  )
};

export default Rolls;