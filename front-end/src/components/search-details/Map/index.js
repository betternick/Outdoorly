import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

import styles from "./map.module.scss";

export default function ParkMap(props) {
  const parkCoords = [props.lat, props.lon];
  let icon = new Icon({ iconUrl: markerIconPng });
  return (
    <MapContainer className={styles.Map} center={parkCoords} zoom={8}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={parkCoords} icon={icon}>
        <Popup>{"Location of " + props.name}</Popup>
      </Marker>
    </MapContainer>
  );
}
