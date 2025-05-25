import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchShipments = createAsyncThunk(
  "shipments/fetchShipments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/shipments");
      if (!response.ok) throw new Error("Failed to fetch shipments");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchShipmentById = createAsyncThunk(
  "shipments/fetchShipmentById",
  async (shipmentId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/shipment/${shipmentId}`);
      if (!response.ok) throw new Error("Failed to fetch shipment details");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const updateShipmentLocation = createAsyncThunk(
    "shipments/updateShipmentLocation",
    async ({ shipmentId, newLocation }, { dispatch, rejectWithValue }) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/shipment/${shipmentId}/update-location`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentLocation: newLocation }),
          }
        );
  
        if (!response.ok) throw new Error("Failed to update location");
  
        const data = await response.json();
  
        
        dispatch(fetchShipments());
        dispatch(fetchShipmentById(shipmentId));
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

const shipmentSlice = createSlice({
  name: "shipments",
  initialState: { list: [], selectedShipment: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchShipmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedShipment = action.payload;
      })
      .addCase(fetchShipmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateShipmentLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateShipmentLocation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateShipmentLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shipmentSlice.reducer;
