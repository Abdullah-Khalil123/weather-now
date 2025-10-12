import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LocationState = {
  city: string;
  country?: string;
  region?: string;
};

const initialState: LocationState = {
  city: 'Islamabad',
  country: 'Pakistan',
  region: '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<LocationState>) {
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.region = action.payload.region;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
