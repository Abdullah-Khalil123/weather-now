import React from 'react';
import Image from 'next/image';
import { weatherIcons } from '@/constants/weatherIcons';

const forcast = [
  {
    day: 'Mon',
    icon: 'sunny',
    high: 30,
    low: 20,
  },
  {
    day: 'Tue',
    icon: 'overcast',
    high: 25,
    low: 18,
  },
  {
    day: 'Wed',
    icon: 'rain',
    high: 22,
    low: 16,
  },
  {
    day: 'Thu',
    icon: 'storm',
    high: 20,
    low: 15,
  },
  {
    day: 'Fri',
    icon: 'sunny',
    high: 28,
    low: 19,
  },
  {
    day: 'Sat',
    icon: 'partlyCloudy',
    high: 27,
    low: 18,
  },
  {
    day: 'Sun',
    icon: 'fog',
    high: 24,
    low: 17,
  },
];

const DailyForcast = () => {
  return (
    <div className="space-y-6">
      <p>Daily forecast</p>

      <div className="grid grid-cols-3 lg:grid-cols-7 gap-4">
        {forcast.map((day, idx) => (
          <div
            key={idx}
            className="bg-app-neutral-800 flex flex-col items-center p-2 rounded-lg space-y-2"
          >
            <p>{day.day}</p>
            <Image
              src={weatherIcons[day.icon]}
              alt={day.icon}
              width={70}
              height={70}
              className="object-contain my-1"
            />
            <div className="w-full flex justify-between">
              <p className="font-light">{day.high}°</p>
              <p className="text-app-neutral-0/60">{day.low}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForcast;
