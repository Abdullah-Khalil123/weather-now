import React from 'react';

const weatherStats = [
  {
    title: 'Humidity',
    value: '65%',
  },
  {
    title: 'Wind',
    value: '15 km/h',
  },
  {
    title: 'Feels Like',
    value: '22°C',
  },
  {
    title: 'Precipitation',
    value: '10mm',
  },
];

const WeatherStatCard = () => {
  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {weatherStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-app-neutral-800 p-4 rounded-xl space-y-4"
          >
            <p className="text-app-neutral-0/60">{stat.title}</p>
            <h3 className="font-light">{stat.value}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherStatCard;
