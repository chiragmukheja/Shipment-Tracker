import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchShipmentById } from "../redux/shipmentSlice";
import MapView from "./MapView";
import UpdateLocation from "./UpdateLocation";

const ShipmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedShipment, loading, error } = useSelector((state) => state.shipments);
  const [eta, setEta] = useState(null);
  const [etaLoading, setEtaLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchShipmentById(id));
  }, [dispatch, id]);

  const fetchETA = async () => {
    setEtaLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/shipment/${id}/eta`);
      const data = await response.json();
      if (response.ok) {
        setEta(data.eta);
      } else {
        setEta("Error fetching ETA");
      }
    } catch (error) {
      setEta("Failed to fetch ETA");
    }
    setEtaLoading(false);
  };

  if (loading) return <p>Loading shipment details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!selectedShipment) return <p>No shipment found.</p>;

  return (
    <div className="container mt-4">
      <h2>Shipment Details</h2>
      <p><strong>Shipment ID:</strong> {selectedShipment.shipmentId}</p>
      <p><strong>Container ID:</strong> {selectedShipment.containerId}</p>
      <p><strong>Route:</strong> {Array.isArray(selectedShipment.route) ? selectedShipment.route.join(" → ") : selectedShipment.route}</p>
      <p><strong>Current Location:</strong> {selectedShipment.currentLocation}</p>
      <p><strong>Status:</strong> <span className={`status-${selectedShipment.status.toLowerCase()}`}>{selectedShipment.status}</span></p>
      <p><strong>Estimated Arrival:</strong> {new Date(selectedShipment.estimatedArrival).toLocaleDateString()}</p>

      <button className="btn btn-primary mt-3" onClick={fetchETA} disabled={etaLoading}>
        {etaLoading ? "Fetching ETA..." : "Get ETA"}
      </button>

      {eta && (
        <p className="mt-2"><strong>ETA:</strong> {eta}</p>
      )}

      <div className="mt-3">
        <MapView shipment={selectedShipment} />
      </div>

      <div className="mt-3">
        <UpdateLocation shipmentId={id} />
      </div>
    </div>
  );
};

export default ShipmentDetails;
