'use client';
import React, { useState, useMemo } from 'react';
import { weatherIcons } from '@/constants/weatherIcons';
import Image from 'next/image';
import DaySwitch from './DaySwitch';
import { useWeatherForcast } from '@/hooks/useWeather';
import { RootState } from '@/store';
import {
  ForecastDay,
  HourlyForecast as HourlyForecastType,
} from '@/types/forcast.schema';
import { useSelector } from 'react-redux';
import { getWeatherIconKey } from '@/utils/getIcon';
import { Skeleton } from '@/components/ui/skeleton';

const HourlyForcast = ({ className }: { className?: string }) => {
  const location = useSelector((state: RootState) => state.locationReducer);
  const unit = useSelector((state: RootState) => state.unitReducer);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const { data, isLoading } = useWeatherForcast({
    location: location.city,
    days: 7,
  });

  const forcasts: ForecastDay[] = data?.forecast?.forecastday || [];

  const forecastDayNames = useMemo(() => {
    return forcasts.map((day) =>
      new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })
    );
  }, [forcasts]);

  const displayedHourlyData = useMemo(() => {
    if (forcasts.length === 0) {
      return [];
    }

    const currentLocalTime = new Date();

    let targetHourlyData: HourlyForecastType[] = [];

    if (selectedDayIndex === 0) {
      const todayHourlyData = forcasts[0].hour;
      const currentHour = currentLocalTime.getHours();

      const startIndex = todayHourlyData.findIndex(
        (hourData) => new Date(hourData.time).getHours() >= currentHour
      );

      if (startIndex !== -1) {
        targetHourlyData = todayHourlyData.slice(startIndex);
      }
    } else if (forcasts.length > selectedDayIndex) {
      targetHourlyData = forcasts[selectedDayIndex].hour;
    }

    return targetHourlyData.slice(0, 9);
  }, [forcasts, selectedDayIndex]);

  return (
    <section className={className}>
      <div className="p-4 rounded-lg bg-app-neutral-800">
        <div className="flex justify-between">
          <p className="text-app-neutral-0/70">Hourly Forecast</p>
          <DaySwitch
            days={forecastDayNames}
            selectedDayIndex={selectedDayIndex}
            onSelectDay={setSelectedDayIndex}
          />
        </div>
        {isLoading ? (
          Array.from({ length: 9 }).map((_, idx) => (
            <Skeleton
              className="h-14 my-2 bg-app-neutral-700 p-2 rounded-lg"
              key={idx}
            />
          ))
        ) : displayedHourlyData.length > 0 ? (
          displayedHourlyData.map(
            (hourData: HourlyForecastType, idx: number) => {
              const time = new Date(hourData.time).toLocaleTimeString('en-US', {
                hour: 'numeric',
                hour12: true,
              });
              const temperature =
                unit.temperatureUnit === 'C'
                  ? hourData.temp_c
                  : hourData.temp_f;
              const iconKey = getWeatherIconKey(hourData.condition.text);

              return (
                <div
                  key={idx}
                  className="bg-app-neutral-700 flex items-center my-2 rounded-lg pl-2 pr-3 justify-between text-app-neutral-0/80"
                >
                  <div className="flex items-center">
                    <Image
                      src={weatherIcons[iconKey] || weatherIcons.sunny}
                      alt={hourData.condition.text}
                      width={50}
                      height={50}
                      className="object-contain my-1"
                    />
                    <p>{time}</p>
                  </div>
                  <p className="text-app-neutral-0/60">
                    {Math.round(temperature)}°
                  </p>
                </div>
              );
            }
          )
        ) : (
          <p className="text-app-neutral-0/50 mt-4">
            No hourly forecast data available for this day.
          </p>
        )}
      </div>
    </section>
  );
};

export default HourlyForcast;
