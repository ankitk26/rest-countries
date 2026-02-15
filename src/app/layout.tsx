import { Playfair_Display, Outfit } from "next/font/google";
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

const themeScript = `
(function() {
  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html
			className={`${playfair.variable} ${outfit.variable} font-body`}
			suppressHydrationWarning
			data-scroll-behavior="smooth"
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className="bg-background text-foreground min-h-screen">
				<CountryProvider>
					<Header />
					<main className="pb-20">{children}</main>
				</CountryProvider>
			</body>
		</html>
	);
}
