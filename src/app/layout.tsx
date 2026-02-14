import Header from "@/components/Header";
import CountryProvider from "@/provider/CountryProvider";
import "@/styles/global.css";
import { Playfair_Display, Outfit } from "next/font/google";

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
      className={`${playfair.variable} ${outfit.variable} font-body`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground min-h-screen">
        <CountryProvider>
          <Header />
          <main className="pb-20">{children}</main>
        </CountryProvider>
      </body>
    </html>
  );
}