'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentLocationWeather } from '@/hooks/useWeather';
import { RootState } from '@/store';
import { Weather } from '@/types/weather.schema';
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherStatCard = () => {
  const location = useSelector((state: RootState) => state.locationReducer);
  const unit = useSelector((state: RootState) => state.unitReducer);
  const { data, isLoading } = useCurrentLocationWeather(location.city);
  const currentWeather: Weather = data || {};

  type WeatherKey = keyof Weather['current'];
  const weatherStats: {
    title: string;
    key: WeatherKey;
    unit: string;
  }[] = [
    {
      title: 'Humidity',
      key: 'humidity',
      unit: '%',
    },
    {
      title: 'Wind',
      key: unit.windSpeed === 'km/h' ? 'wind_kph' : 'wind_mph',
      unit: unit.windSpeed,
    },
    {
      title: 'Feels Like',
      key: unit.temperatureUnit === 'C' ? 'temp_c' : 'temp_f',
      unit: unit.temperatureUnit,
    },
    {
      title: 'Precipitation',
      key: unit.precipitation === 'in' ? 'precip_in' : 'precip_mm',
      unit: unit.precipitation,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton className="h-30 bg-app-neutral-800" key={idx} />
            ))
          : weatherStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-app-neutral-800 p-4 rounded-xl space-y-4"
              >
                <p className="text-app-neutral-0/60">{stat.title}</p>
                <h3 className="font-light">
                  {!isLoading
                    ? currentWeather?.current?.[stat.key] + ' ' + stat.unit
                    : '-'}
                </h3>
              </div>
            ))}
      </div>
    </section>
  );
};

export default WeatherStatCard;
