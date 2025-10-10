import DailyForcast from '@/components/sections/DailyForcast';
import HeroSection from '@/components/sections/Hero';
import HourlyForcast from '@/components/sections/HourlyForcast';
import Overview from '@/components/sections/Overview';
import WeatherStatCard from '@/components/sections/Overview/WeatherStatCard';
import React from 'react';

const Home = () => {
  return (
    <div className="space-y-8">
      <HeroSection />
      <div className="lg:flex gap-6 pb-8">
        <div className="flex-2 flex flex-col justify-between space-y-6">
          <Overview />
          <WeatherStatCard />
          <DailyForcast />
        </div>
        <div className="flex-1 mt-6 lg:mt-0">
          <HourlyForcast />
        </div>
      </div>
    </div>
  );
};

export default Home;
