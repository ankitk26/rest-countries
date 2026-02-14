"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useCountries } from "@/provider/country-provider";

export default function Header() {
	const { theme, toggleTheme } = useCountries();

	return (
		<header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
			<div className="mx-auto flex w-11/12 max-w-7xl items-center justify-between py-5">
				<Link href="/" className="group">
					<h1 className="font-display text-2xl font-normal tracking-tight transition-opacity duration-300 group-hover:opacity-70 md:text-3xl">
						Atlas
					</h1>
				</Link>

				<button
					onClick={toggleTheme}
					className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border/40 transition-all duration-300 hover:border-border hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
					aria-label={
						theme === "light"
							? "Switch to dark mode"
							: "Switch to light mode"
					}
				>
					<span className="sr-only">
						{theme === "light" ? "Dark" : "Light"} mode
					</span>
					{theme === "light" ? (
						<Moon
							size={16}
							strokeWidth={1.5}
							className="opacity-70"
						/>
					) : (
						<Sun
							size={16}
							strokeWidth={1.5}
							className="opacity-70"
						/>
					)}
				</button>
			</div>
		</header>
	);
}
