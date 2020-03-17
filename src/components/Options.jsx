import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../styles/Options.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const Status = props => {
  const statusCollection = [];
  for (let key in props.dataOptions) {
    const newStatus = props.dataOptions[key];
    statusCollection.push(
      <div key={"status-body_" + key} className={`status-body ${key}`}>
        <div key={"status-header_" + key} className={`status-header ${key}`}>
          {newStatus.name}
        </div>
        {props.sumStatus(key)}
      </div>
    );
  }
  return statusCollection;
};

const showOnMapOptions = dataOptions => {
  let options = [];
  for (let key in dataOptions) {
    options.push({
      value: key,
      label: dataOptions[key].name
    });
  }
  return options;
};

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
      <Status {...props} />
      Exibir no Mapa:
      <Dropdown
        options={showOnMapOptions(props.dataOptions)}
        onChange={props.handleDropdown}
        placeholder={props.dataOptions[props.dataType].name}
      />
      <div style={{ marginTop: "5em" }}>
        [Fonte]: Ministério da Saúde - Governo Brasileiro
      </div>
      <div
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() =>
          window.open(
            "http://plataforma.saude.gov.br/novocoronavirus/",
            "_blank"
          )
        }
      >
        Notificação de casos COVID-19
      </div>
      <div
        style={{ color: "blue", cursor: "pointer", marginTop: "1em" }}
        onClick={() =>
          window.open("https://github.com/caio-davi/covid-br", "_blank")
        }
      >
        GitHub
      </div>
    </div>
  );
};

export default Options;
