import React from "react";
import { Map, TileLayer, Circle, Popup } from "react-leaflet";

const LeafletMap = props => {
  const getPosition = uId => {
    for (let i in props.states) {
      if (props.states[i].uid === uId) {
        return [props.states[i]["lat"], props.states[i]["lon"]];
      }
    }
  };

  const getName = uId => {
    for (let i in props.states) {
      if (props.states[i].uid === uId) {
        return props.states[i].name;
      }
    }
  };

  const Circles = () => {
    let markers = [];
    for (let i in props.cases) {
      const position = getPosition(parseInt(props.cases[i].uid));
      if (props.cases[i][props.dataType] !== undefined) {
        markers.push(
            <Circle
              key={"circle_" + i}
              radius={props.cases[i][props.dataType] * 500}
              center={position}
              color={props.color}
            >
              <Popup>
              {props.dataOptions[props.dataType].name} em {getName(props.cases[i].uid)}: <br /> {props.cases[i][props.dataType]}.
          </Popup>
            </Circle>
        );
      }
    }
    return markers;
  };

  return (
    <Map center={props.center} zoom={4}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Circles />
    </Map>
  );
};
export default LeafletMap;
