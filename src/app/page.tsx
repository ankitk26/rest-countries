import CountriesList from "@/components/countries-list";
import FilterCountry from "@/components/filter-country";
import SearchCountry from "@/components/search-country";
import { Country } from "@/types";

export const metadata = {
	title: "Atlas - Explore the World",
};

export default async function HomePage() {
	let countries: Country[] = [];

	try {
		const response = await fetch(
			"https://restcountries.com/v3.1/all?fields=name,cca2,ccn3,cca3,capital,region,subregion,population,flags,borders",
			{ next: { revalidate: 86400 } },
		);

		if (!response.ok) {
			const errorData = await response.text();
			console.error(`API error ${response.status}:`, errorData);
			throw new Error(`API error: ${response.status}`);
		}

		const data = await response.json();

		if (Array.isArray(data)) {
			countries = data;
		} else {
			console.error("API returned non-array data:", data);
		}
	} catch (error) {
		console.error("Failed to fetch countries:", error);
	}

	return (
		<div className="mx-auto w-11/12 max-w-7xl py-8">
			<header className="animate-fade-in mb-12 opacity-0">
				<h2 className="text-display mb-3 font-display text-4xl md:text-5xl lg:text-6xl">
					Explore the World
				</h2>
				<p className="max-w-lg font-light text-muted">
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
