import { Playfair_Display, Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header";
import "@/styles/global.css";
import CountryProvider from "@/provider/country-provider";

const playfair = Playfair_Display({
	variable: "--font-display",
	subsets: ["latin"],
	display: "swap",
});

const outfit = Outfit({
	variable: "--font-body",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	display: "swap",
});

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html
			suppressHydrationWarning
			data-scroll-behavior="smooth"
		>
			<body
				className={`${playfair.variable} ${outfit.variable} bg-background text-foreground min-h-screen font-body`}
			>
				<ThemeProvider attribute="class" defaultTheme="light">
					<CountryProvider>
						<Header />
						<main className="pb-20">{children}</main>
					</CountryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
