import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/back-button";
import { Country } from "@/types";
import { formatPopulation } from "@/utils/format-population";

interface Props {
	params: Promise<{
		country_code: string;
	}>;
}

async function getCountryByCode(countryCode: string) {
	try {
		const response = await fetch(
			`https://restcountries.com/v3.1/alpha/${countryCode}`,
			{
				next: { revalidate: 86400 },
			},
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
			<div className="mx-auto w-11/12 max-w-7xl py-20 text-center">
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
				{
					next: { revalidate: 86400 },
				},
			);

			if (response.ok) {
				const data = await response.json();
				borderCountries = (Array.isArray(data) ? data : []).sort(
					(a, b) => a.name.common.localeCompare(b.name.common),
				);
			}
		} catch (error) {
			console.error("Failed to fetch border countries:", error);
		}
	}

	return (
		<div className="mx-auto w-11/12 max-w-7xl py-8">
			<BackButton />

			<div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
				<div className="animate-slide-up opacity-0">
					<div className="rounded-elegant border-border/40 bg-secondary relative aspect-[4/3] overflow-hidden border">
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

				<div className="animate-slide-up stagger-2 opacity-0">
					<h1 className="text-display font-display mb-8 text-3xl md:text-4xl lg:text-5xl">
						{country.name.common}
					</h1>

					<div className="mb-10 grid gap-x-12 gap-y-6 sm:grid-cols-2">
						<dl className="space-y-4">
							{country.name.official && (
								<div>
									<dt className="text-label mb-1">
										Official Name
									</dt>
									<dd className="text-foreground/80 font-light">
										{country.name.official}
									</dd>
								</div>
							)}
							{country.population > 0 && (
								<div>
									<dt className="text-label mb-1">
										Population
									</dt>
									<dd className="text-foreground/80 font-light">
										{formatPopulation(country.population)}
									</dd>
								</div>
							)}
							<div>
								<dt className="text-label mb-1">Region</dt>
								<dd className="text-foreground/80 font-light">
									{country.region}
								</dd>
							</div>
							{country.subregion && (
								<div>
									<dt className="text-label mb-1">
										Subregion
									</dt>
									<dd className="text-foreground/80 font-light">
										{country.subregion}
									</dd>
								</div>
							)}
							{country.capital && country.capital.length > 0 && (
								<div>
									<dt className="text-label mb-1">Capital</dt>
									<dd className="text-foreground/80 font-light">
										{country.capital.join(", ")}
									</dd>
								</div>
							)}
						</dl>

						<dl className="space-y-4">
							{country.tld && country.tld.length > 0 && (
								<div>
									<dt className="text-label mb-1">
										Top Level Domain
									</dt>
									<dd className="text-foreground/80 font-light">
										{country.tld.join(", ")}
									</dd>
								</div>
							)}
							{country.currencies &&
								Object.keys(country.currencies).length > 0 && (
									<div>
										<dt className="text-label mb-1">
											Currencies
										</dt>
										<dd className="text-foreground/80 font-light">
											{(
												Object.values(
													country.currencies,
												) as Array<{ name: string }>
											)
												.map((c) => c.name)
												.join(", ")}
										</dd>
									</div>
								)}
							{country.languages &&
								Object.keys(country.languages).length > 0 && (
									<div>
										<dt className="text-label mb-1">
											Languages
										</dt>
										<dd className="text-foreground/80 font-light">
											{Object.values(
												country.languages,
											).join(", ")}
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
							<ul className="mt-2 flex flex-wrap gap-2">
								{borderCountries.map((border) => (
									<Link
										href={`/countries/${border.cca2}`}
										key={border.cca2}
										className="btn-elegant rounded-elegant px-4 py-2 text-sm"
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
