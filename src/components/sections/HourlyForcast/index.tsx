import React from 'react';
import { ChevronDown } from 'lucide-react';
import { weatherIcons } from '@/constants/weatherIcons';
import Image from 'next/image';

const times = [
  { time: '1 AM', temp: '21°', icon: 'overcast' },
  { time: '2 AM', temp: '20°', icon: 'overcast' },
  { time: '3 AM', temp: '19°', icon: 'drizzle' },
  { time: '4 AM', temp: '18°', icon: 'sunny' },
  { time: '5 AM', temp: '18°', icon: 'partlyCloudy' },
  { time: '6 AM', temp: '17°', icon: 'sunny' },
  { time: '7 AM', temp: '17°', icon: 'sunny' },
  { time: '8 AM', temp: '18°', icon: 'fog' },
  { time: '9 AM', temp: '19°', icon: 'sunny' },
];

const HourlyForcast = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <div className="p-4 rounded-lg bg-app-neutral-800">
        {/* Header */}
        <div className="flex justify-between">
          <p className="text-app-neutral-0/70">Hourly Forcast</p>

          {/* Day Selector Dropdown */}
          <div className="text-app-neutral-0/60 flex gap-1 px-2 py-1 rounded-lg items-center bg-app-neutral-700 hover:bg-app-neutral-600 cursor-pointer">
            <p>Tuesday</p>
            <ChevronDown size={18} />
          </div>
        </div>
        {/* Hourly Forcast List */}
        {times.map((t, idx) => (
          <div
            key={idx}
            className="bg-app-neutral-700 flex items-center my-2 rounded-lg px-2 justify-between text-app-neutral-0/80"
          >
            <div className="flex items-center">
              <Image
                src={weatherIcons[t.icon]}
                alt={t.icon}
                width={50}
                height={50}
                className="object-contain my-1"
              />
              <p>{t.time}</p>
            </div>
            <p className="text-app-neutral-0/60">{t.temp}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HourlyForcast;
