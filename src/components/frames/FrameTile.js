import React from "react"

const FrameTile = (props) => {
  return(
    <div>
      <br/>
      <li>aperature: f/{props.aperature}</li>
      <li>shutterspeed: 1/{props.shutterSpeed}</li>
      <li>exposure #{props.frameNumber}</li>
      <li>notes: {props.notes}</li>
      <li>created at: {props.createdAt}</li>
    </div>
  )
};
  
export default FrameTile