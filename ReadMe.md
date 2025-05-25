Here's the updated content for your `README.md` with the video demo link included:

```markdown
# Cargo Shipment Management

This project includes a **frontend** and **backend** for shipment management. The frontend is a React application, and the backend is built with Node.js, Express, and MongoDB.

## Table of Contents
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [MongoDB Setup](#mongodb-setup)
- [Environment Variables](#environment-variables)
- [Routes](#routes)


## Installation

To get started with this project, follow the steps below to set up both the frontend and backend.

### 1. Clone the Repositories

1. **Clone the repository:**
   ```powershell
   git clone https://github.com/chiragmukheja/Cargo-Shipment-Tracker.git
   cd shipment-management
   ```

2. This project contains two main directories:
   - `frontend`: Contains the React application.
   - `backend`: Contains the Node.js and Express API.

### 2. Install Dependencies

After cloning the repository, install the dependencies for both the frontend and backend.

#### Frontend Installation:
```powershell
cd frontend
npm install
```

#### Backend Installation:
```powershell
cd ../backend
npm install
```

## Running the Project

You will need two separate terminals to run both the frontend and backend simultaneously.

### 1. Running Frontend (React Application)

1. Open a terminal window and navigate to the `frontend` folder:
   ```powershell
   cd frontend
   ```

2. Run the development server for the frontend:
   ```powershell
   npm start
   ```

   This will start the React application on `http://localhost:3000`.

### 2. Running Backend (Node.js + Express API)

1. Open another terminal window and navigate to the `backend` folder:
   ```powershell
   cd backend
   ```

2. Run the backend API server:
   ```powershell
   npm start
   ```

   This will start the API server on `http://localhost:5000`.

### 3. Verify the Setup

- The **frontend** should be running at `http://localhost:3000`.
- The **backend API** should be running at `http://localhost:5000`.

## MongoDB Setup

To run this project, you need to have **MongoDB** installed on your computer. Follow these steps:

### 1. Install MongoDB:
   - If you don’t have MongoDB installed, you can download it from the [MongoDB Download Center](https://www.mongodb.com/try/download/community).

### 2. Start MongoDB:
   - For Windows, MongoDB should start automatically after installation, but if needed manually:
     ```powershell
     net start MongoDB
     ```

### 3. Verify MongoDB:
   - You can verify that MongoDB is running by executing:
     ```powershell
     mongo
     ```

   - This should connect to your local MongoDB instance.

## Environment Variables

Make sure to configure the following environment variables for the backend:

- **MONGO_URI**: MongoDB connection string (e.g., `mongodb://localhost:27017/shipmentdb`)
- **PORT**: The port on which the backend server will run (default: `5000`)

Create a `.env` file in the `backend` directory and add the following:
```bash
MONGO_URI=mongodb://localhost:27017/shipmentdb
PORT=5000
ORS_API_KEY=your_api_key_here //OPENROUTESERVICE_API_KEY
```

## Routes

The following routes are available in the backend:

1. **Get all shipments**:
   - `GET /shipments`
   - **Description**: Fetches all shipments.
   
2. **Get shipment by ID**:
   - `GET /shipment/:id`
   - **Description**: Fetches a shipment by its unique ID.

3. **Create a new shipment**:
   - `POST /shipment`
   - **Description**: Creates a new shipment.

4. **Update shipment location**:
   - `POST /shipment/:id/update-location`
   - **Description**: Updates the location of a shipment.

5. **Get Estimated Time of Arrival (ETA)**:
   - `GET /shipment/:id/eta`
   - **Description**: Fetches the estimated time of arrival for a shipment.


---

### **Conclusion**
This `README.md` provides a complete guide for setting up and running both the frontend and backend parts of the shipment management project.

