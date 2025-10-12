'use client';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import useDebounce from '@/hooks/useDebounce';
import { useGetAutoComplete } from '@/hooks/useWeather';
import { setLocation } from '@/store/slice/locationSlice';
import { City } from '@/types/cities.schema';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const debounceSearch = useDebounce(value);
  const { data, isFetched, isLoading } = useGetAutoComplete(debounceSearch);
  const cities: City[] = data || [];

  const showList = open && (isLoading || isFetched);

  const handleSearch = () => {
    if (!value.trim()) return;

    const cityData = selectedCity ?? {
      name: value,
      country: 'Unknown',
      region: 'Unknown',
    };

    dispatch(
      setLocation({
        city: cityData.name,
        country: cityData.country,
        region: cityData.region,
      })
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="space-y-2 lg:flex gap-4 lg:space-y-0 w-full lg:w-fit"
    >
      <Command
        ref={wrapperRef}
        filter={() => 1}
        className="relative overflow-visible bg-app-neutral-800 w-full lg:w-md rounded-lg"
      >
        <CommandInput
          placeholder="Search for a place..."
          value={value}
          className="h-12"
          onClick={() => setOpen(true)}
          onValueChange={(val) => {
            setValue(val);
            setOpen(val.trim().length > 0);
          }}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              handleSearch();
            }
          }}
        />

        {showList && (
          <CommandList className="absolute bg-app-neutral-800 w-full rounded-lg top-14 z-10">
            {isLoading ? (
              <div className="p-3 text-sm text-gray-400">Loading...</div>
            ) : (
              <>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {cities.map((city) => (
                    <CommandItem
                      className="h-10"
                      key={city.id}
                      onSelect={() => {
                        setSelectedCity(city);
                        setValue(city.name);
                        setOpen(false);
                      }}
                    >
                      {city.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        )}
      </Command>

      <button className="bg-blue-500 w-full lg:w-30 py-2 rounded-lg px-4 text-base hover:bg-blue-700 transition cursor-pointer">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
