import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewShipment = () => {
  const navigate = useNavigate();
  const [shipment, setShipment] = useState({
    shipmentId: "",
    containerId: "",
    route: "",
    currentLocation: "",
    status: "Pending",
    estimatedArrival: "",
  });

  const handleChange = (e) => {
    setShipment({ ...shipment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.post("http://localhost:5000/api/shipment", {
        ...shipment,
        route: shipment.route.split(",").map((loc) => loc.trim()), 
      });
      alert("Shipment Created Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating shipment:", error);
      alert("Failed to create shipment");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">New Shipment</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Shipment ID</label>
          <input
            type="text"
            name="shipmentId"
            className="form-control"
            value={shipment.shipmentId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Container ID</label>
          <input
            type="text"
            name="containerId"
            className="form-control"
            value={shipment.containerId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Route (Comma Separated)</label>
          <input
            type="text"
            name="route"
            className="form-control"
            value={shipment.route}
            onChange={handleChange}
            placeholder="Enter locations separated by commas"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Current Location</label>
          <input
            type="text"
            name="currentLocation"
            className="form-control"
            value={shipment.currentLocation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={shipment.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Estimated Arrival</label>
          <input
            type="date"
            name="estimatedArrival"
            className="form-control"
            value={shipment.estimatedArrival}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit Shipment</button>
      </form>
    </div>
  );
};

export default NewShipment;
