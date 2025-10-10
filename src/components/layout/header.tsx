import React from 'react';
import Image from 'next/image';
import UnitSwitch from '../partials/UnitSwitch';

const Header = () => {
  return (
    <header className="flex justify-between py-6">
      <Image
        src={'/images/logo.svg'}
        width={150}
        height={30}
        alt="logo-weather-now"
      />
      <UnitSwitch />
    </header>
  );
};

export default Header;
