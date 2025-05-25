const Shipment = require("../models/Shipment");
const axios = require("axios");
require("dotenv").config();

const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });
    res.status(200).json(shipment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const createShipment = async (req, res) => {
  const { shipmentId, containerId, route, currentLocation,status, estimatedArrival } = req.body;

  try {
    const newShipment = new Shipment({
      shipmentId,
      containerId,
      route,
      status,
      currentLocation,
      estimatedArrival,
    });

    await newShipment.save();
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create shipment" });
  }
};


const updateShipmentLocation = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });

    shipment.currentLocation = req.body.currentLocation;
    await shipment.save();
    res.status(200).json({ message: "Location updated", shipment });
  } catch (error) {
    res.status(500).json({ message: "Failed to update location" });
  }
};




const getCoordinates = async (cityName) => {
    try {
      const response = await axios.get('https://api.openrouteservice.org/geocode/search', {
        params: {
          api_key: process.env.ORS_API_KEY, 
          text: cityName,
        },
      });
    
      if (response.data && response.data.features && response.data.features.length > 0) {
        const { lon, lat } = response.data.features[0].geometry.coordinates;
        return [lat, lon];
      } else {
        throw new Error(`No coordinates found for city: ${cityName}`);
      }
    } catch (error) {
      console.error("Error geocoding city:", error);
      throw error;
    }
  };
  
  
  const getETA= async (req, res) => {
    try {
      const shipment = await Shipment.findById(req.params.id);
      if (!shipment) {
        return res.status(404).json({ message: 'Shipment not found' });
      }
  
      const { currentLocation, route } = shipment;
      const destinationCity = route[route.length - 1];
  
      
      const currentLocationCoords = await getCoordinates(currentLocation);
      const destinationCoords = await getCoordinates(destinationCity);
  
      
      console.log("Current Location Coordinates:", currentLocationCoords);
      console.log("Destination Coordinates:", destinationCoords);
  
      
      const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
        params: {
          api_key: process.env.ORS_API_KEY, 
          start: currentLocationCoords.join(','), 
          end: destinationCoords.join(','), 
        },
      });
  
      
      if (!response.data.routes || response.data.routes.length === 0 || !response.data.routes[0].summary || !response.data.routes[0].summary.duration) {
        return res.status(500).json({ message: 'Failed to retrieve valid ETA from API' });
      }
  
      
      const durationInSeconds = response.data.routes[0].summary.duration;
      const estimatedArrival = new Date(Date.now() + durationInSeconds * 1000); 
  
      
      shipment.estimatedArrival = estimatedArrival;
      await shipment.save();
  
      res.status(200).json({ estimatedArrival });
    } catch (error) {
      console.error('Error fetching ETA:', error);
  
      const errorMessage = error.response ? error.response.data : error.message;
      res.status(500).json({
        message: 'Failed to update ETA',
        error: errorMessage,
      });
    }
  }
module.exports = {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipmentLocation,
  getETA,
};
