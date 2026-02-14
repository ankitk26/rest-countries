"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useCountries } from "@/provider/CountryProvider";

export default function Header() {
  const { theme, toggleTheme } = useCountries();

  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="w-11/12 max-w-7xl mx-auto py-5 flex items-center justify-between">
        <Link href="/" className="group">
          <h1 className="font-display text-2xl md:text-3xl font-normal tracking-tight group-hover:opacity-70 transition-opacity duration-300">
            Atlas
          </h1>
        </Link>

        <button
          onClick={toggleTheme}
          className="relative w-10 h-10 rounded-full flex items-center justify-center border border-border/40 hover:border-border hover:bg-secondary/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/20"
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          <span className="sr-only">
            {theme === "light" ? "Dark" : "Light"} mode
          </span>
          {theme === "light" ? (
            <Moon size={16} strokeWidth={1.5} className="opacity-70" />
          ) : (
            <Sun size={16} strokeWidth={1.5} className="opacity-70" />
          )}
        </button>
      </div>
    </header>
  );
}