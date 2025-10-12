import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.params) config.params = {};
  config.params.key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  return config;
});

export { axiosInstance };
