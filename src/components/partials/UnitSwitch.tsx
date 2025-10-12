'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings as GearIcon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import {
  setTemperature,
  setWindSpeed,
  setPrecipitation,
  setSystem,
} from '@/store/slice/unitSlice';

const UnitSwitch = () => {
  const dispatch = useDispatch();
  const { temperatureUnit, windSpeed, precipitation, system } = useSelector(
    (state: RootState) => state.unitReducer
  );

  const handleSetTemperature = (unit: 'C' | 'F') => {
    dispatch(setTemperature(unit));
  };

  const handleSetWindSpeed = (unit: 'km/h' | 'mph') => {
    dispatch(setWindSpeed(unit));
  };

  const handleSetPrecipitation = (unit: 'mm' | 'in') => {
    dispatch(setPrecipitation(unit));
  };

  const handleSetSystem = (system: 'metric' | 'imperial') => {
    dispatch(setSystem(system));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-1 items-center bg-app-neutral-800 pl-4 pr-3 py-2 rounded-lg hover:bg-app-neutral-700 hover:text-white transition text-base"
        >
          <GearIcon size={18} />
          Units
          <ChevronDown size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-app-neutral-800 border border-app-neutral-700 text-gray-100"
      >
        <DropdownMenuItem
          className="cursor-pointer hover:bg-app-neutral-700"
          onClick={() =>
            handleSetSystem(system === 'imperial' ? 'metric' : 'imperial')
          }
        >
          Switch to {system === 'imperial' ? 'Metric' : 'Imperial'}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-app-neutral-600" />

        <DropdownMenuLabel className="text-gray-400 text-xs uppercase">
          Temperature
        </DropdownMenuLabel>
        <DropdownMenuItem
          className={`${
            temperatureUnit === 'C' ? 'bg-app-neutral-700' : ''
          } cursor-pointer hover:bg-app-neutral-700`}
          onClick={() => handleSetTemperature('C')}
        >
          Celsius (°C)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            temperatureUnit === 'F' ? 'bg-app-neutral-700' : ''
          } cursor-pointer hover:bg-app-neutral-700`}
          onClick={() => handleSetTemperature('F')}
        >
          Fahrenheit (°F)
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-app-neutral-600" />

        <DropdownMenuLabel className="text-gray-400 text-xs uppercase">
          Wind Speed
        </DropdownMenuLabel>
        <DropdownMenuItem
          className={`${
            windSpeed === 'km/h' ? 'bg-app-neutral-700' : ''
          } cursor-pointer hover:bg-app-neutral-700`}
          onClick={() => handleSetWindSpeed('km/h')}
        >
          km/h
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            windSpeed === 'mph' ? 'bg-app-neutral-700' : ''
          } cursor-pointer hover:bg-app-neutral-700`}
          onClick={() => handleSetWindSpeed('mph')}
        >
          mph
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-app-neutral-600" />

        <DropdownMenuLabel className="text-gray-400 text-xs uppercase">
          Precipitation
        </DropdownMenuLabel>
        <DropdownMenuItem
          className={`${
            precipitation === 'mm' ? 'bg-app-neutral-700' : ''
          } cursor-pointer hover:bg-app-neutral-700`}
          onClick={() => handleSetPrecipitation('mm')}
        >
          Millimeters (mm)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            precipitation === 'in' ? 'bg-app-neutral-700' : ''
          } cursor-pointer hover:bg-app-neutral-700`}
          onClick={() => handleSetPrecipitation('in')}
        >
          Inches (in)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UnitSwitch;
