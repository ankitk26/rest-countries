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
      title: "Country Not Found | Atlas",
    };
  }

  return {
    title: `${country.name.common} | Atlas`,
  };
}

export default async function CountryPage({ params }: Props) {
  const { country_code } = await params;
  const country = await getCountryByCode(country_code);

  if (!country) {
    return (
      <div className="w-11/12 max-w-7xl mx-auto py-20 text-center">
        <p className="text-muted font-light">Country not found</p>
      </div>
    );
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
    <div className="w-11/12 max-w-7xl mx-auto py-8">
      <BackButton />

      <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="opacity-0 animate-slide-up">
          <div className="relative aspect-[4/3] rounded-elegant overflow-hidden bg-secondary border border-border/40">
            <Image
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="opacity-0 animate-slide-up stagger-2">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-display mb-8">
            {country.name.common}
          </h1>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 mb-10">
            <dl className="space-y-4">
              {country.name.official && (
                <div>
                  <dt className="text-label mb-1">Official Name</dt>
                  <dd className="font-light text-foreground/80">
                    {country.name.official}
                  </dd>
                </div>
              )}
              {country.population && (
                <div>
                  <dt className="text-label mb-1">Population</dt>
                  <dd className="font-light text-foreground/80">
                    {formatPopulation(country.population)}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-label mb-1">Region</dt>
                <dd className="font-light text-foreground/80">
                  {country.region}
                </dd>
              </div>
              {country.subregion && (
                <div>
                  <dt className="text-label mb-1">Subregion</dt>
                  <dd className="font-light text-foreground/80">
                    {country.subregion}
                  </dd>
                </div>
              )}
              {country.capital && (
                <div>
                  <dt className="text-label mb-1">Capital</dt>
                  <dd className="font-light text-foreground/80">
                    {Array.isArray(country.capital)
                      ? country.capital.join(", ")
                      : country.capital}
                  </dd>
                </div>
              )}
            </dl>

            <dl className="space-y-4">
              {country.tld && country.tld.length > 0 && (
                <div>
                  <dt className="text-label mb-1">Top Level Domain</dt>
                  <dd className="font-light text-foreground/80">
                    {country.tld.join(", ")}
                  </dd>
                </div>
              )}
              {country.currencies && (
                <div>
                  <dt className="text-label mb-1">Currencies</dt>
                  <dd className="font-light text-foreground/80">
                    {(Object.values(country.currencies) as Array<{ name: string }>)
                      .map(c => c.name)
                      .join(", ")}
                  </dd>
                </div>
              )}
              {country.languages && (
                <div>
                  <dt className="text-label mb-1">Languages</dt>
                  <dd className="font-light text-foreground/80">
                    {Object.values(country.languages).join(", ")}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {borderCountries && borderCountries.length > 0 && (
            <div>
              <dt className="text-label mb-3 inline-block">
                Border Countries
              </dt>
              <ul className="flex flex-wrap gap-2 mt-2">
                {borderCountries.map((border) => (
                  <Link
                    href={`/countries/${border.cca2}`}
                    key={border.cca2}
                    className="btn-elegant rounded-elegant text-sm py-2 px-4"
                  >
                    {border.name.common}
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