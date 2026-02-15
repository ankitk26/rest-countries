import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import CountriesList from "@/components/countries-list";
import FilterCountry from "@/components/filter-country";
import SearchCountry from "@/components/search-country";
import { Country } from "@/types";

export const metadata: Metadata = {
	title: "Atlas - Explore the World",
};

const getAllCountries = unstable_cache(
	async () => {
		const response = await fetch(
			"https://restcountries.com/v3.1/all?fields=name,cca2,ccn3,cca3,capital,region,subregion,population,flags,borders",
		);

		if (!response.ok) {
			const errorData = await response.text();
			throw new Error(`API error ${response.status}: ${errorData}`);
		}

		const data = await response.json();
		return Array.isArray(data)
			? data.sort((a: Country, b: Country) =>
					a.name.common.localeCompare(b.name.common),
				)
			: [];
	},
	["all-countries"],
	{ revalidate: 86400 },
);

export default async function HomePage() {
	let countries: Country[] = [];

	try {
		countries = await getAllCountries();
	} catch {
		// Silently handle error
	}

	return (
		<div className="mx-auto w-11/12 max-w-7xl py-8">
			<header className="animate-fade-in mb-12 opacity-0">
				<h2 className="text-display font-display mb-3 text-4xl md:text-5xl lg:text-6xl">
					Explore the World
				</h2>
				<p className="text-muted max-w-lg font-light">
					Discover countries, cultures, and continents. A curated
					collection of nations from every corner of the globe.
				</p>
			</header>

			<div className="animate-fade-in stagger-1 mb-4 flex flex-col gap-4 opacity-0 md:flex-row md:items-center md:justify-between">
				<SearchCountry />
				<FilterCountry />
			</div>

			<CountriesList countries={countries} />
		</div>
	);
}
