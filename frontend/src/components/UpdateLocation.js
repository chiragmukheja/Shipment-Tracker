import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateShipmentLocation } from "../redux/shipmentSlice";

const UpdateLocation = ({ shipmentId }) => {
  const [newLocation, setNewLocation] = useState("");
  const dispatch = useDispatch();

  const updateLocation = async () => {
    await dispatch(updateShipmentLocation({ shipmentId, newLocation }));
  };

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Enter new location"
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
      />
      <button className="btn btn-success mt-2" onClick={updateLocation}>
        Update Location
      </button>
    </div>
  );
};

export default UpdateLocation;
