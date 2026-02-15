import Image from "next/image";
import Link from "next/link";
import { Country } from "@/types";
import { formatPopulation } from "@/utils/format-population";

interface Props {
	country: Country;
	index?: number;
}

export default function CountryCard({ country, index = 0 }: Props) {
	return (
		<Link href={`/countries/${country.cca2}`} className="group block h-full">
			<article
				className="card-elegant animate-slide-up rounded-elegant flex h-full flex-col overflow-hidden opacity-0"
				style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
			>
				<div className="bg-secondary relative aspect-[3/2] overflow-hidden">
					<Image
						src={country.flags.svg}
						alt={`Flag of ${country.name.common}`}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						className="object-contain p-3 transition-transform duration-200 ease-out group-hover:scale-[1.03]"
						loading={index < 4 ? "eager" : "lazy"}
						priority={index < 4}
					/>
				</div>

				<div className="flex flex-1 flex-col p-5">
					<h2 className="font-display mb-4 text-lg tracking-tight transition-colors duration-200 ease-out group-hover:text-muted md:text-xl">
						{country.name.common}
					</h2>

					<dl className="mt-auto space-y-2 text-sm">
						{country.population > 0 && (
							<div className="flex gap-2">
								<dt className="text-label w-24">Population</dt>
								<dd className="text-muted font-light">
									{formatPopulation(country.population)}
								</dd>
							</div>
						)}
						{country.region && (
							<div className="flex gap-2">
								<dt className="text-label w-24">Region</dt>
								<dd className="text-muted font-light">
									{country.region}
								</dd>
							</div>
						)}
						{country.capital && country.capital.length > 0 && (
							<div className="flex gap-2">
								<dt className="text-label w-24">Capital</dt>
								<dd className="text-muted font-light">
									{country.capital[0]}
								</dd>
							</div>
						)}
					</dl>
				</div>
			</article>
		</Link>
	);
}
