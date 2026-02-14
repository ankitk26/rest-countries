"use client";

import { useCountries } from "@/provider/CountryProvider";
import { Search } from "lucide-react";

export default function SearchCountry() {
  const { search, setSearch } = useCountries();

  return (
    <div className="relative w-full max-w-md">
      <Search
        size={16}
        strokeWidth={1.5}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
      />
      <input
        type="text"
        value={search}
        placeholder="Search countries..."
        onChange={(e) => setSearch(e.target.value)}
        className="input-elegant w-full pl-11 pr-4 rounded-elegant font-light placeholder:text-muted/60"
      />
    </div>
  );
}