/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "upload.wikimedia.org" },
		],
	},
};

module.exports = nextConfig;
