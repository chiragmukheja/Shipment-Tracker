import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ shipment }) => {
  const [position, setPosition] = useState(null); 

  useEffect(() => {
    if (shipment?.currentLocation) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(shipment.currentLocation)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const newPosition = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            setPosition(newPosition);
          } else {
            console.error("No coordinates found for location:", shipment.currentLocation);
            alert(`No valid coordinates found for "${shipment.currentLocation}". Please check the location name.`);
          }
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
          alert("Failed to fetch location data. Please try again.");
        });
    }
  }, [shipment?.currentLocation]);

  return (
    <div>
      <h4 className="mb-3">Shipment Location</h4>
      <MapContainer center={position || [20, 78]} zoom={5} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <>
            <Marker position={position}>
              <Popup>
                <strong>Shipment ID:</strong> {shipment.shipmentId} <br />
                <strong>Current Location:</strong> {shipment.currentLocation}
              </Popup>
            </Marker>
            <ChangeView center={position} zoom={10} />
          </>
        )}
      </MapContainer>
    </div>
  );
};


const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

export default MapView;
