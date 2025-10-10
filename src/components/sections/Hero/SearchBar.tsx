import { SearchIcon } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
  return (
    <div className="space-y-2 lg:flex gap-4 lg:space-y-0 w-full lg:w-fit">
      <div className="relative">
        <SearchIcon
          className="absolute text-app-neutral-300 -translate-y-1/2 top-1/2 left-4"
          size={18}
        />
        <input
          placeholder="Search for a place..."
          type="text"
          className="bg-app-neutral-800 w-full lg:w-lg rounded-lg py-2 pl-12 pr-4"
        />
      </div>
      <button className="bg-blue-500 w-full lg:w-30 py-2 rounded-lg px-4 text-base hover:bg-blue-700 transition cursor-pointer">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
