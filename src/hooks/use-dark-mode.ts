import { useEffect, useState } from "react";

export const useDarkMode = () => {
	const [theme, setTheme] = useState("light");
	const [mounted, setMounted] = useState(false);

	const setMode = (mode: string) => {
		localStorage.setItem("theme", mode);
		setTheme(mode);
		if (mode === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	const toggleTheme = () => {
		if (theme === "light") {
			setMode("dark");
		} else {
			setMode("light");
		}
	};

	useEffect(() => {
		setMounted(true);
		const localTheme = localStorage.getItem("theme");
		if (localTheme) {
			setTheme(localTheme);
			if (localTheme === "dark") {
				document.documentElement.classList.add("dark");
			}
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
			document.documentElement.classList.add("dark");
		}
	}, []);

	return [theme, toggleTheme, mounted] as const;
};
