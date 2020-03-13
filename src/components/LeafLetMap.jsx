import React from "react";
import { Map, TileLayer, Circle } from "react-leaflet";
import L from "leaflet";

const LeafletMap = props => {

  const Circles = () => {
    let markers = [];
    for (let i in props.states) {
      const position = [props.states[i]["lat"], props.states[i]["lon"]];
      markers.push(
        <div>
          <Circle radius={35} center={position} color={'red'} />
        </div>
      );
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
