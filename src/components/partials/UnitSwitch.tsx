import React from 'react';
import { SettingsIcon as GearIcon, ChevronDown } from 'lucide-react';

const UnitSwitch = () => {
  return (
    <div className="flex gap-1 items-center bg-app-neutral-800 pl-4 pr-3 py-2 rounded-lg cursor-pointer hover:bg-app-neutral-700 transition">
      <GearIcon size={18} />
      <p className="text-base">Units</p>
      <ChevronDown size={18} />
    </div>
  );
};

export default UnitSwitch;
