import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../styles/Options.css";

const Options = props => {
  return (
    <div className="Options">
      <div className="option">
      Day: {props.day}
      <Slider
        min={0}
        max={props.data.length - 1}
        defaultValue={props.data.length - 1}
        handle={props.handleSlider}
      />
      </div>
      
    </div>
  );
};

export default Options;
