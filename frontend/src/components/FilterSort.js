import React from "react";

const FilterSort = ({ onFilter, onSort }) => {
  return (
    <div className="d-flex justify-content-between mb-3">
      <select onChange={(e) => onFilter(e.target.value)} className="form-select w-25">
        <option value="">Filter by Status</option>
        <option value="Pending">Pending</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
      </select>
      <select onChange={(e) => onSort(e.target.value)} className="form-select w-25">
        <option value="">Sort by</option>
        <option value="eta">ETA</option>
        <option value="location">Current Location</option>
      </select>
    </div>
  );
};

export default FilterSort;
