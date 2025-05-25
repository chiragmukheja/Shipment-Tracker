const express = require("express");
const {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipmentLocation,
  getETA,
} = require("../controllers/shipmentController");

const router = express.Router();

router.get("/shipments", getShipments);
router.get("/shipment/:id", getShipmentById);
router.post("/shipment", createShipment);
router.post("/shipment/:id/update-location", updateShipmentLocation);
router.get("/shipment/:id/eta", getETA);

module.exports = router;
