import React from "react";
import "../styles/App.css";
import states from "../states";
import LeafletMap from "./LeafLetMap";
import Options from "./Options";

import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import { blue } from "ansi-colors";

const data = window.database.brazil;
const Handle = Slider.Handle;
const center = [-15, -52];
const firstDataOptions = {
  suspects: {
    name: "Casos Suspeitos",
    color: "blue",
    enabled: false
  },
  cases: {
    name: "Casos Confirmados",
    color: "red",
    enabled: false
  },
  refuses: {
    name: "Casos Descartados",
    color: "green",
    enabled: false
  },
  deaths: {
    name: "Óbitos",
    color: "black",
    enabled: false
  }
};

function App() {
  const [day, setDay] = React.useState(data.length - 1);
  const [dataOptions, setDataOptions] = React.useState(firstDataOptions);

  const toogleDataOption = type => {
    let newoptions = dataOptions; 
    newoptions[type].enabled = !dataOptions[type].enabled;
    setDataOptions({...dataOptions, ...newoptions})
  }

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
        <Options
          data={data}
          handleSlider={handleSlider}
          day={data[day].date}
          dataOptions={dataOptions}
          toogleDataOption={toogleDataOption}
        />
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
