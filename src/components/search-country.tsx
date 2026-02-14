"use client";

import { Search } from "lucide-react";
import { useCountries } from "@/provider/country-provider";

export default function SearchCountry() {
	const { search, setSearch } = useCountries();

	return (
		<div className="relative w-full max-w-md">
			<Search
				size={16}
				strokeWidth={1.5}
				className="text-muted pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
			/>
			<input
				type="text"
				value={search}
				placeholder="Search countries..."
				onChange={(e) => setSearch(e.target.value)}
				className="input-elegant rounded-elegant placeholder:text-muted/60 w-full pr-4 pl-11 font-light"
			/>
		</div>
	);
}
