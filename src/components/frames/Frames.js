import React from "react";

import FrameTile from "./FrameTile";

const Frames = (props) => {
  console.log('rendering Frames component...')
  console.log('frames props', props)
  let framesArray;
  if(props.frames) {
    framesArray = props.frames.map((frame => {
      return (
        <div key={frame.id}>
          <FrameTile
            aperature={frame.aperature}
            shutterSpeed={frame.shutterSpeed}
            frameNumber={frame.frameNumber}
            notes={frame.notes}
            createdAt={frame.createdAt}
          />
          <button className="button" onClick={() => props.deleteFrame(props.rollId, frame.id)}>delete this frame</button>
        </div>
      );
    }))
  }

  return(
    <div>
      {framesArray}
    </div>
  )
};
  
export default Frames