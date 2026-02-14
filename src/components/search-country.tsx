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
				className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
			/>
			<input
				type="text"
				value={search}
				placeholder="Search countries..."
				onChange={(e) => setSearch(e.target.value)}
				className="input-elegant w-full rounded-elegant pl-11 pr-4 font-light placeholder:text-muted/60"
			/>
		</div>
	);
}
