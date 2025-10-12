import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UnitsState = {
  temperatureUnit: 'C' | 'F';
  windSpeed: 'km/h' | 'mph';
  precipitation: 'mm' | 'in';
  system: 'imperial' | 'metric' | 'custom';
};

const initialState: UnitsState = {
  temperatureUnit: 'C',
  windSpeed: 'km/h',
  precipitation: 'mm',
  system: 'metric',
};

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    setTemperature(state, action: PayloadAction<'C' | 'F'>) {
      state.temperatureUnit = action.payload;
      state.system = 'custom';
    },
    setWindSpeed(state, action: PayloadAction<'km/h' | 'mph'>) {
      state.windSpeed = action.payload;
      state.system = 'custom';
    },
    setPrecipitation(state, action: PayloadAction<'mm' | 'in'>) {
      state.precipitation = action.payload;
      state.system = 'custom';
    },
    setSystem(state, action: PayloadAction<'metric' | 'imperial'>) {
      if (action.payload === 'imperial') {
        state.temperatureUnit = 'F';
        state.windSpeed = 'mph';
        state.precipitation = 'in';
        state.system = 'imperial';
      } else {
        state.temperatureUnit = 'C';
        state.windSpeed = 'km/h';
        state.precipitation = 'mm';
        state.system = 'metric';
      }
    },
  },
});

export const { setTemperature, setWindSpeed, setPrecipitation, setSystem } =
  unitsSlice.actions;

export default unitsSlice.reducer;
