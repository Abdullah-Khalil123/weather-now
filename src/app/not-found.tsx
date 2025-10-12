'use client';
import HeroSection from '@/components/sections/Hero';
import { RootState } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const NoResultsFound = () => {
  const router = useRouter();
  const pathname = usePathname();
  const location = useSelector((state: RootState) => state.locationReducer);
  const prevLocation = useRef(location);

  useEffect(() => {
    if (location && location !== prevLocation.current) {
      router.push('/');
    }
    prevLocation.current = location;
  }, [location, pathname, router]);

  return (
    <div className="space-y-8">
      <HeroSection />
      <div className="lg:flex gap-6 pb-8">
        <h3 className="mx-auto">
          {pathname == '/no-results-found'
            ? 'No search results found!'
            : 'Page Not Found'}
        </h3>
      </div>
    </div>
  );
};

export default NoResultsFound;
