import BackButton from "@/components/BackButton";
import { Country } from "@/types";
import { formatPopulation } from "@/utils/formatPopulation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{
    country_code: string;
  }>;
}

async function getCountryByCode(countryCode: string) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`,
      { next: { revalidate: 86400 } }
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data[0] : null;
  } catch (error) {
    console.error("Failed to fetch country:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country_code } = await params;
  const country = await getCountryByCode(country_code);

  if (!country) {
    return {
      title: "Country Not Found",
    };
  }

  return {
    title: `${country.flag || "🏳️"} ${country.name.common}`,
  };
}

export default async function CountryPage({ params }: Props) {
  const { country_code } = await params;
  const country = await getCountryByCode(country_code);

  if (!country) {
    return <p>Country not found</p>;
  }

  let borderCountries: Country[] = [];
  
  if (country.borders && country.borders.length > 0) {
    const borderCodes = country.borders.join(",");
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${borderCodes}`,
        { next: { revalidate: 86400 } }
      );
      
      if (response.ok) {
        const data = await response.json();
        borderCountries = Array.isArray(data) ? data : [];
      }
    } catch (error) {
      console.error("Failed to fetch border countries:", error);
    }
  }

  return (
    <div className="mt-8 w-11/12 mx-auto">
      <BackButton />

      <div className="mt-16 md:grid md:grid-cols-2 md:items-center md:gap-16">
        <Image
          src={country.flags.svg}
          alt={country.name.common}
          className="object-contain"
          width={600}
          height={400}
        />

        <div>
          <h2 className="font-bold mt-8 text-2xl">{country.name.common}</h2>

          <div className="md:grid md:grid-cols-2 md:items-start md:mt-12 md:justify-between">
            <div className="flex flex-col gap-4 mt-10 md:mt-0">
              <div>
                <strong>Native name: </strong>
                <span>{country.name.official}</span>
              </div>
              {country.population && (
                <div>
                  <strong>Population: </strong>
                  <span>{formatPopulation(country.population)}</span>
                </div>
              )}
              <div>
                <strong>Region: </strong>
                <span>{country.region}</span>
              </div>
              {country.subregion && (
                <div>
                  <strong>Sub Region: </strong>
                  <span>{country.subregion}</span>
                </div>
              )}
              {country.capital && (
                <div>
                  <strong>Capital: </strong>
                  <span>{country.capital}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-16 md:mt-0">
              {country.tld && (
                <div>
                  <strong>Top level Domain: </strong>
                  <span>{country.tld[0]}</span>
                </div>
              )}
              {country.currencies && (
                <div>
                  <strong>Currencies: </strong>
                  <span>
                    {Object.values(country.currencies)
                      .map((currency) => (currency as { name: string }).name)
                      .join(", ")}
                  </span>
                </div>
              )}
              {country.languages && (
                <div>
                  <strong>Languages: </strong>
                  <span>
                    {Object.values(country.languages)
                      .map((currency) => currency)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {borderCountries && borderCountries.length > 0 && (
            <div className="mt-12">
              <h2>Border Countries: </h2>
              <ul className="flex items-center gap-4 flex-wrap mt-2 max-w-full">
                {borderCountries?.map((border) => (
                  <Link
                    href={`/countries/${border.cca2}`}
                    key={border.cca2}
                    passHref
                  >
                    <li className="bg-secondary px-6 py-2 text-center rounded-md border border-neutral-200 hover:opacity-80">
                      {border.name.common}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
