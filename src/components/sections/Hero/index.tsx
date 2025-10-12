import React from 'react';
import SearchBar from './SearchBar';

const HeroSections = () => {
  return (
    <section className="flex flex-col items-center mx-auto gap-10 lg:max-w-2xl mt-8">
      <h2 className="font-bricolage-grotesque text-center">
        How&apos;s the sky looking today?
      </h2>
      <SearchBar />
    </section>
  );
};

export default HeroSections;
