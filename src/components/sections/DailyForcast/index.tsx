'use client';
import React from 'react';
import Image from 'next/image';
import { weatherIcons } from '@/constants/weatherIcons';
import { useWeatherForcast } from '@/hooks/useWeather';
import { RootState } from '@/store';
import { ForecastDay } from '@/types/forcast.schema';
import { useSelector } from 'react-redux';
import { getWeatherIconKey } from '@/utils/getIcon';
import { Skeleton } from '@/components/ui/skeleton'; // ShadCN Skeleton

const DailyForcast = () => {
  const location = useSelector((state: RootState) => state.locationReducer);
  const unit = useSelector((state: RootState) => state.unitReducer);
  const { data, isLoading, isError } = useWeatherForcast({
    location: location.city,
    days: 7,
  });
  const forcasts: ForecastDay[] = data?.forecast?.forecastday || [];

  if (isError) return null;
  return (
    <div className="space-y-6">
      <p>Daily forecast</p>

      <div className="grid grid-cols-3 lg:grid-cols-7 gap-4">
        {isLoading
          ? Array.from({ length: 7 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="bg-app-neutral-800 h-36 p-2 rounded-lg"
              ></Skeleton>
            ))
          : forcasts.map((forcast, idx) => {
              const iconKey = getWeatherIconKey(forcast.day.condition.text);
              const iconSrc = weatherIcons[iconKey];
              return (
                <div
                  key={idx}
                  className="bg-app-neutral-800 flex flex-col items-center p-2 rounded-lg space-y-2"
                >
                  <p>
                    {new Date(forcast.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                    })}
                  </p>
                  <Image
                    src={iconSrc}
                    alt={iconSrc}
                    width={70}
                    height={70}
                    className="object-contain my-1"
                  />
                  <div className="w-full flex justify-between">
                    <p className="font-light">
                      {parseInt(
                        String(
                          unit.temperatureUnit == 'C'
                            ? forcast.day.maxtemp_c
                            : forcast.day.maxtemp_f
                        )
                      )}
                      °
                    </p>
                    <p className="text-app-neutral-0/60">
                      {parseInt(
                        String(
                          unit.temperatureUnit == 'C'
                            ? forcast.day.mintemp_c
                            : forcast.day.mintemp_f
                        )
                      )}
                      °
                    </p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default DailyForcast;
