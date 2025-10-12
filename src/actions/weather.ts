import { axiosInstance } from '@/utils/axios';

const getCurrentLocationWeather = async (query?: string) => {
  try {
    const response = await axiosInstance.get('current.json', {
      params: {
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getWeatherForcastDays = async ({
  location,
  days = 7,
}: {
  location: string;
  days?: number;
}) => {
  try {
    const response = await axiosInstance.get('forecast.json', {
      params: {
        q: location,
        days,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getCurrentLocationWeather, getWeatherForcastDays };
