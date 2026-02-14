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
		<Link href={`/countries/${country.cca2}`} className="group block">
			<article
				className="card-elegant animate-slide-up overflow-hidden rounded-elegant opacity-0"
				style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
			>
				<div className="relative aspect-[4/3] overflow-hidden bg-secondary">
					<Image
						src={country.flags.svg}
						alt={`Flag of ${country.name.common}`}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						className="object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
				</div>

				<div className="p-5">
					<h2 className="mb-4 font-display text-lg tracking-tight transition-opacity duration-300 group-hover:opacity-70 md:text-xl">
						{country.name.common}
					</h2>

					<dl className="space-y-2 text-sm">
						{country.population && (
							<div className="flex gap-2">
								<dt className="text-label w-24">Population</dt>
								<dd className="font-light text-muted">
									{formatPopulation(country.population)}
								</dd>
							</div>
						)}
						{country.region && (
							<div className="flex gap-2">
								<dt className="text-label w-24">Region</dt>
								<dd className="font-light text-muted">
									{country.region}
								</dd>
							</div>
						)}
						{country.capital && (
							<div className="flex gap-2">
								<dt className="text-label w-24">Capital</dt>
								<dd className="font-light text-muted">
									{Array.isArray(country.capital)
										? country.capital[0]
										: country.capital}
								</dd>
							</div>
						)}
					</dl>
				</div>
			</article>
		</Link>
	);
}
