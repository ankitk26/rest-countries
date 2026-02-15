"use client";

import { createContext, useContext, useState } from "react";
import { useTheme } from "next-themes";

interface ContextProps {
	search: string;
	region: string;
	theme: string;
	toggleTheme: () => void;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	setRegion: React.Dispatch<React.SetStateAction<string>>;
}

const CountryContext = createContext({} as ContextProps);

interface ProviderProps {
	children: React.ReactNode;
}

export default function CountryProvider({ children }: ProviderProps) {
	const [search, setSearch] = useState("");
	const [region, setRegion] = useState("All");
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<CountryContext.Provider
			value={{
				search,
				region,
				theme: theme || "light",
				toggleTheme,
				setSearch,
				setRegion,
			}}
		>
			{children}
		</CountryContext.Provider>
	);
}

export const useCountries = () => useContext(CountryContext);
