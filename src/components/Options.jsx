import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../styles/Options.css";

const statusStyle = status => {
  return {
    backgroundColor: status.color
  };
};

const Status = props => {
  const statusCollection = [];
  for (let key in props.dataOptions) {
    const newStatus = props.dataOptions[key];
    statusCollection.push(
      <div className={`status-body ${key}`}>
        <div className={`status-header ${key}`}>{newStatus.name}</div>
          {props.sumStatus(key)}
      </div>
    );
  }
  return statusCollection;
};

const Options = props => {
  return (
    <div className="Options">
      <div className='option'>

      Day: {props.day}
      <Slider
        min={0}
        max={props.data.length - 1}
        defaultValue={props.data.length - 1}
        handle={props.handleSlider}
        />
        </div>
      <Status {...props}
      />
      Show on map:
    </div>
  );
};

export default Options;
