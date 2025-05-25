import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ShipmentDetails from "./components/ShipmentDetails";
import NewShipment from "./components/NewShipment";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/shipment/:id" element={<ShipmentDetails />} />
        <Route path="/new-shipment" element={<NewShipment/>} />
      </Routes>
    </Router>
  );
};

export default App;
