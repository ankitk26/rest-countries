import CountriesList from "@/components/CountriesList";
import FilterCountry from "@/components/FilterCountry";
import SearchCountry from "@/components/SearchCountry";
import { Country } from "@/types";

export const metadata = {
  title: "All countries",
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
    <div className="my-4 mx-auto w-11/12">
      <div className="md:flex md:items-center md:justify-between">
        <SearchCountry />
        <FilterCountry />
      </div>
      <CountriesList countries={countries} />
    </div>
  );
}
