import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../styles/Options.css";

const Options = props => {
  const strike = {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  };

  const textStyle = enabled => {
    let style = {
      fontSize: "medium"
    };
    if (!enabled) {
      style["textDecoration"] = "line-through";
    }
    return style;
  };

  const CaseTypes = props => {
    let optionsCheckBox = [];

    for (let key in props.dataOptions) {
      const type = props.dataOptions[key];
      const label = {
        width: 30,
        height: 10,
        backgroundColor: type.color,
        marginLeft: 15
      };

      optionsCheckBox.push(
        <div  className="d-flex flex-row" key={"type_" + key}>
          <canvas
            id={"lil_sqr_" + key}
            style={label}
            onClick={() => props.toogleDataOption(key)}
          />
          <div style={textStyle(type.enabled)}>{type.name}</div>
        </div>
      );
    }
    return <div>{optionsCheckBox}</div>;
  };

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
        <CaseTypes
          dataOptions={props.dataOptions}
          toogleDataOption={props.toogleDataOption}
        />
      </div>
    </div>
  );
};

export default Options;
