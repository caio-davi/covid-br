import React from "react";
import "../styles/App.css";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import states from "../states";
import LeafletMap from "./LeafLetMap";

const Handle = Slider.Handle;
const center = [-15.77972, -47.92972];

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

// console.log(window.database)

function App() {
  return (
    <div className="App">
      <header className="App-header">Learn React</header>
      <div>
        <div>
          <LeafletMap center={center} states={states} />
        </div>
        <Slider min={0} max={20} defaultValue={3} handle={handle} />
      </div>
    </div>
  );
}

export default App;
