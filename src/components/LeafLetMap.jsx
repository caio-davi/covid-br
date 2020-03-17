import React from "react";
import { Map, TileLayer, Circle, Popup } from "react-leaflet";
import { MDBContainer} from "mdbreact";
import "../styles/LeafLetMap.css";

const LeafletMap = props => {
  const Circles = () => {
    let markers = [];
    for (let i in props.cases) {
      const position = props.getPosition(parseInt(props.cases[i].uid));
      if (props.cases[i][props.dataType] !== undefined) {
        markers.push(
          <Circle
            key={"circle_" + i}
            radius={props.cases[i][props.dataType] * 500}
            center={position}
            color={props.color}
          >
            <Popup>
              {props.dataOptions[props.dataType].name} em{" "}
              {props.getName(props.cases[i].uid)}: <br />{" "}
              {props.cases[i][props.dataType]}
            </Popup>
          </Circle>
        );
      }
    }
    return markers;
  };

  return (
    <MDBContainer className="leaflet-container">
      <Map center={props.center} zoom={4.6} zoomSnap={0.2}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Circles />
      </Map>
    </MDBContainer>
  );
};
export default LeafletMap;
