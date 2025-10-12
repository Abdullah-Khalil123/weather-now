'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DaySwitchProps {
  days: string[]; // Array of day names to display
  selectedDayIndex: number; // Index of the currently selected day
  onSelectDay: (index: number) => void; // Callback when a day is selected
}

const DaySwitch = ({ days, selectedDayIndex, onSelectDay }: DaySwitchProps) => {
  const selectedDayName = days[selectedDayIndex] || 'Select Day';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-1 items-center bg-app-neutral-700 py-2 rounded-lg hover:bg-app-neutral-600 transition"
        >
          <div className="text-app-neutral-0/60 flex gap-1 rounded-lg items-center cursor-pointer">
            <p>{selectedDayName}</p>
            <ChevronDown size={18} />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-app-neutral-800 border border-app-neutral-700 text-gray-100"
      >
        {days.map((day, index) => (
          <DropdownMenuItem
            key={day}
            onClick={() => {
              onSelectDay(index); // Pass the index of the selected day
            }}
            className="cursor-pointer hover:bg-app-neutral-700"
            // Optionally, add a visual indicator for the selected day
            // className={`${index === selectedDayIndex ? 'bg-app-neutral-600' : ''} cursor-pointer hover:bg-app-neutral-700`}
          >
            {day}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DaySwitch;
