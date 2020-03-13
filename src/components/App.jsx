import React from "react";
import "../styles/App.css";
import states from "../states";
import LeafletMap from "./LeafLetMap";
import Options from "./Options";

import Slider from "rc-slider";
import Tooltip from "rc-tooltip";

const data = window.database.brazil;
const Handle = Slider.Handle;
const center = [-15, -52];

function App() {
  const [day, setDay] = React.useState(data.length - 1);

  const handleSlider = props => {
    const { value, dragging, index, ...restProps } = props;
    setDay(value);
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

  return (
    <div className="App">
      <header className="App-header">COVID-19 Brasil</header>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Options data={data} handleSlider={handleSlider} day={data[day].date} />
        <div className="leaflet-container">
          <LeafletMap
            center={center}
            states={states}
            cases={data[day].values}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
