"use client";

import { useCountries } from "@/provider/country-provider";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

const regions = [
	{ value: "All", label: "All Regions" },
	{ value: "Africa", label: "Africa" },
	{ value: "Americas", label: "Americas" },
	{ value: "Asia", label: "Asia" },
	{ value: "Europe", label: "Europe" },
	{ value: "Oceania", label: "Oceania" },
];

export default function FilterCountry() {
	const { region, setRegion } = useCountries();

	return (
		<div className="w-full max-w-[200px]">
			<Select value={region} onValueChange={(val) => setRegion(val)}>
				<SelectTrigger>
					<SelectValue placeholder="Filter by region" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{regions.map((r) => (
							<SelectItem key={r.value} value={r.value}>
								{r.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
