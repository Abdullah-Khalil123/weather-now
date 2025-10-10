import React from 'react';
import SearchBar from './SearchBar';

const HeroSections = () => {
  return (
    <section className="flex flex-col items-center gap-10 mt-8">
      <h2 className="font-bricolage-grotesque text-center">
        How&apos;s the sky looking today?
      </h2>
      <SearchBar />
    </section>
  );
};

export default HeroSections;
