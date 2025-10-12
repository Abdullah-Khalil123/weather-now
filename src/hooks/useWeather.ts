import { getAutoComplete } from '@/actions/autocomplete';
import {
  getCurrentLocationWeather,
  getWeatherForcastDays,
} from '@/actions/weather';
import { useQuery } from '@tanstack/react-query';

const useGetAutoComplete = (search?: string) => {
  return useQuery({
    queryKey: ['auto-complete', search],
    queryFn: () => getAutoComplete(search),
    retry: false,
    enabled: !!search,
  });
};

const useCurrentLocationWeather = (search?: string) => {
  return useQuery({
    queryKey: ['current-weather', search],
    queryFn: () => getCurrentLocationWeather(search),
    retry: false,
    enabled: !!search,
  });
};

const useWeatherForcast = (query: { location: string; days?: number }) => {
  return useQuery({
    queryKey: ['forcast-weather', query],
    queryFn: () => getWeatherForcastDays(query),
    retry: false,
  });
};

export { useGetAutoComplete, useCurrentLocationWeather, useWeatherForcast };
