/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "restcountries.eu" },
			{ protocol: "https", hostname: "flagcdn.com" },
			{ protocol: "https", hostname: "upload.wikimedia.org" },
		],
	},
};

module.exports = nextConfig;
