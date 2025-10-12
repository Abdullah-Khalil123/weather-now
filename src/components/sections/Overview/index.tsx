'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useCurrentLocationWeather } from '@/hooks/useWeather';
import { Weather } from '@/types/weather.schema';
import { Skeleton } from '@/components/ui/skeleton';
import { SyncLoader } from 'react-spinners';
import { getWeatherIconKey } from '@/utils/getIcon';
import { weatherIcons } from '@/constants/weatherIcons';
import { useRouter } from 'next/navigation';

const Overview = () => {
  const router = useRouter();
  const location = useSelector((state: RootState) => state.locationReducer);
  const { temperatureUnit } = useSelector(
    (state: RootState) => state.unitReducer
  );
  const { data, isLoading, error, isError } = useCurrentLocationWeather(
    location.city
  );
  const currentWeather: Weather = data || {};

  const iconKey = getWeatherIconKey(
    !isLoading ? currentWeather?.current?.condition?.text : 'sunny'
  );
  const iconSrc = weatherIcons[iconKey];

  useEffect(() => {
    if (isError) {
      router.push('no-results-found');
    }
  }, [error, isError]);

  if (isError) return null;

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
            src="/images/bg-today-large.svg"
            objectFit="cover"
            className="-z-10 hidden sm:block" // hidden on small, visible from sm
          />
          {/* Small screens */}
          <Image
            fill
            alt="overview-card-bg-mobile"
            src="/images/bg-today-small.svg"
            objectFit="cover"
            className="-z-10 block sm:hidden" // visible on small, hidden from sm
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

            <div className="flex items-center justify-center flex-wrap">
              <Image
                alt="icon-sunny"
                src={iconSrc}
                width={100}
                height={100}
                priority
              />
              <h1 className="italic text-5xl lg:text-7xl">
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
