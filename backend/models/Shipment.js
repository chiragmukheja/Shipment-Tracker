const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  shipmentId: { type: String, required: true, unique: true },
  containerId: { type: String, required: true },
  route: [{ type: String }],
  currentLocation: { type: String, required: true },
  status: { type: String, enum: ["Pending", "In Transit", "Delivered"], default: "Pending" },
  estimatedArrival: { type: Date, required: true },
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;
