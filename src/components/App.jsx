import React from "react";
import "../styles/App.css";
import states from "../states";
import LeafletMap from "./LeafLetMap";
import LineChart from "./LineChart";
import Options from "./Options";

import Slider from "rc-slider";
import Tooltip from "rc-tooltip";

const data = window.database.brazil;
const Handle = Slider.Handle;
const center = [-15, -52];

const dataOptions = {
  suspects: {
    name: "Casos Suspeitos",
    borderColor: "royalblue",
    backgroundColor:"cornflowerblue" ,
    enabled: false
  },
  cases: {
    name: "Casos Confirmados",
    color: "red",
    borderColor: "darksalmon",
    backgroundColor:"Salmon" ,
    enabled: false
  },
  refuses: {
    name: "Casos Descartados",
    color: "green",
    borderColor: "darkseagreen",
    backgroundColor:"Seagreen" ,
    enabled: false
  },
  deaths: {
    name: "Óbitos",
    color: "grey",
    borderColor: "LightSteelBlue",
    backgroundColor:"lightslategray" ,
    enabled: false
  }
};

function App() {
  const [day, setDay] = React.useState(data.length - 1);
  const [dataType, setDataType] = React.useState("cases");

  const sumStatus = status => {
    let count = 0;
    for (let i in data[day].values) {
      const state = data[day].values[i];
      if (state[status] != undefined) {
        count = count + state[status];
      }
    }
    return count;
  };

  const handleDropdown = obj => {
    setDataType(obj.value);
  };

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
      <header className="App-header">Infográfico da Evolução do COVID-19 no Brasil</header>
      <div className="Body">
        <Options
          data={data}
          handleSlider={handleSlider}
          day={data[day].date}
          dataOptions={dataOptions}
          sumStatus={sumStatus}
          handleDropdown={handleDropdown}
        />
        <div className="leaflet-container">
          <LeafletMap
            center={center}
            states={states}
            dataType={dataType}
            color={dataOptions[dataType].borderColor}
            cases={data[day].values}
          />
        </div>
        <LineChart data={data} dataOptions={dataOptions}/>
      </div>
    </div>
  );
}

export default App;
