const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../config/db"); 
const shipmentRoutes = require("../routes/shipmentRoutes"); 

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Default route to show message
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Cargo Shipment Tracker</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f0f4f8;
            color: #333;
            padding: 40px;
          }
          h1 {
            color: #2c7a7b;
          }
          h2 {
            margin-top: 40px;
            color: #2d3748;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            background: #ffffff;
            margin: 10px 0;
            padding: 12px 20px;
            border-left: 5px solid #2c7a7b;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            font-family: monospace;
          }
          .footer {
            margin-top: 50px;
            font-size: 0.9rem;
            color: #718096;
          }
        </style>
      </head>
      <body>
        <h1>🎉 Chirag, Congratulations! The Backend is Running Smoothly 🚀</h1>
        <p>Your Cargo Shipment Tracker API is live and ready to serve.</p>

        <h2>📦 Available API Routes:</h2>
        <ul>
          <li>GET /api/shipments</li>
          <li>GET /api/shipment/:id</li>
          <li>POST /api/shipment</li>
          <li>POST /api/shipment/:id/update-location</li>
          <li>GET /api/shipment/:id/eta</li>
        </ul>

        <div class="footer">
          Made with ❤️ using Express.js
        </div>
      </body>
    </html>
  `);
});


app.use("/api", shipmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
