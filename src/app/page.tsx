import CountriesList from "@/components/CountriesList";
import FilterCountry from "@/components/FilterCountry";
import SearchCountry from "@/components/SearchCountry";
import { Country } from "@/types";

export const metadata = {
  title: "Atlas - Explore the World",
};

export default async function HomePage() {
  let countries: Country[] = [];

  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,ccn3,cca3,capital,region,subregion,population,flags,borders",
      { next: { revalidate: 86400 } }
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
    <div className="w-11/12 max-w-7xl mx-auto py-8">
      <header className="mb-12 opacity-0 animate-fade-in">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-display mb-3">
          Explore the World
        </h2>
        <p className="text-muted font-light max-w-lg">
          Discover countries, cultures, and continents. A curated collection of
          nations from every corner of the globe.
        </p>
      </header>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 opacity-0 animate-fade-in stagger-1">
        <SearchCountry />
        <FilterCountry />
      </div>

      <CountriesList countries={countries} />
    </div>
  );
}