"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { createContext, useContext, useState } from "react";

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
  const [theme, toggleTheme] = useDarkMode();

  return (
    <CountryContext.Provider
      value={{
        search,
        region,
        theme,
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
