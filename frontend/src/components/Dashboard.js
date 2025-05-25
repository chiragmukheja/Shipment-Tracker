import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipments } from "../redux/shipmentSlice";
import { Link } from "react-router-dom";
import FilterSort from "./FilterSort";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.shipments);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  if (loading) return <p>Loading shipments...</p>;

 
 
let filteredList = filterStatus
? list.filter((shipment) => shipment.status === filterStatus)
: [...list];


if (sortBy === "eta") {
filteredList = [...filteredList].sort((a, b) => new Date(a.estimatedArrival) - new Date(b.estimatedArrival));
} else if (sortBy === "location") {
filteredList = [...filteredList].sort((a, b) => a.currentLocation.localeCompare(b.currentLocation));
}


  return (
    <div className="container mt-4">
      <h2>Shipments</h2>
      
      <FilterSort onFilter={setFilterStatus} onSort={setSortBy} />

      <table className="table">
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Container ID</th>
            <th>Current Location</th>
            <th>ETA</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((shipment) => (
            <tr key={shipment._id}>
              <td>{shipment.shipmentId}</td>
              <td>{shipment.containerId}</td>
              <td>{shipment.currentLocation}</td>
              <td>{new Date(shipment.estimatedArrival).toLocaleDateString()}</td>
              <td>{shipment.status}</td>
              <td>
                <Link to={`/shipment/${shipment._id}`} className="btn btn-primary btn-sm">Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
