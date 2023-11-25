/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sta.vnres.co',
                port: '',
                pathname: '/file/**',
            },
        ],
    },
    // // Make Next.js to act as a reverse proxy
    // async rewrites() {
    //     return [
	// 		{
	// 			source: '/api/proxy/:path*',
	// 			destination: `http://:path*`,
	// 		},
	// 	]
    // }
}

module.exports = nextConfig
