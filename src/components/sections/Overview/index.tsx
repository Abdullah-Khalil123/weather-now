'use client';
import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useCurrentLocationWeather } from '@/hooks/useWeather';
import { Weather } from '@/types/weather.schema';
import { Skeleton } from '@/components/ui/skeleton';
import { SyncLoader } from 'react-spinners';

const Overview = () => {
  const location = useSelector((state: RootState) => state.locationReducer);
  const { temperatureUnit } = useSelector(
    (state: RootState) => state.unitReducer
  );
  const { data, isLoading } = useCurrentLocationWeather(location.city);
  const currentWeather: Weather = data || {};
  return (
    <section>
      {isLoading ? (
        <Skeleton className="flex flex-col items-center justify-center bg-app-neutral-800 h-[300px] 6 p-2 rounded-lg">
          <SyncLoader className="my-4" color="#aeaeb7" speedMultiplier={0.7} />
          <p>Loading...</p>
        </Skeleton>
      ) : (
        <div className={'relative h-[300px] rounded-xl overflow-hidden'}>
          <Image
            fill
            alt="overview-card-bg"
            src={'/images/bg-today-large.svg'}
            priority
            objectFit="cover"
            className="-z-10"
          />
          <div className="z-20 px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6">
            <div>
              <h3>
                {currentWeather?.location?.name},{' '}
                {currentWeather?.location?.country}
              </h3>
              <p className="text-app-neutral-0/60">
                {new Date(
                  currentWeather?.location?.localtime?.replace(' ', 'T')
                ).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>

            <div className="flex items-center">
              <Image
                alt="icon-sunny"
                src={'/images/icon-sunny.webp'}
                width={100}
                height={100}
                priority
              />
              <h1 className="italic">
                {temperatureUnit == 'C'
                  ? currentWeather?.current?.temp_c
                  : currentWeather?.current?.temp_f}
                <span>°</span>
              </h1>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Overview;
