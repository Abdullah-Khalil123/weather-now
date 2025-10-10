import React from 'react';
import Image from 'next/image';

const Overview = () => {
  return (
    <section>
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
            <h3>Berlin, Germany</h3>
            <p className="text-app-neutral-0/60">Tuesday, Aug 5, 2025</p>
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
              25<span>°</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
