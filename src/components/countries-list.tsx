"use client";

import { useCountries } from "@/provider/country-provider";
import { Country } from "@/types";
import CountryCard from "./country-card";

interface Props {
	countries: Country[];
}

export default function CountriesList({ countries }: Props) {
	const { region, search } = useCountries();

	const countriesByRegion = countries.filter((country) => {
		if (region === "All") {
			return true;
		}
		return country.region === region;
	});

	const filteredCountries = countriesByRegion.filter((country) => {
		if (search === "") {
			return true;
		}
		return country.name.common.toLowerCase().includes(search.toLowerCase());
	});

	if (filteredCountries?.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-center">
				<p className="text-muted font-light">No countries found</p>
				<p className="text-muted/60 mt-2 text-sm">
					Try adjusting your search or filter
				</p>
			</div>
		);
	}

	return (
		<div className="mt-12">
			<div className="mb-8 flex items-center gap-4">
				<span className="text-label">
					{filteredCountries.length} countries
				</span>
				<div className="divider" />
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
				{filteredCountries?.map((country: Country, index: number) => (
					<CountryCard
						key={country.cca2}
						country={country}
						index={index}
					/>
				))}
			</div>
		</div>
	);
}
