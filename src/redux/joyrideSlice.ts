import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface TourState {
  isActive: boolean;
  currentTour: "home" | "dashboard" | null;
}
const initialState: TourState = {
  isActive: false,
  currentTour: null,
};

const joyRideSlice = createSlice({
  name: "joyRideState",
  initialState,
  reducers: {
    startTour: (state, action: PayloadAction<"home" | "dashboard">) => {
      state.isActive = true;
      state.currentTour = action.payload;
    },
    endTour: (state) => {
      state.isActive = false;
      state.currentTour = null;
    },
  },
});

export const {startTour, endTour} = joyRideSlice.actions;

export default joyRideSlice.reducer;
