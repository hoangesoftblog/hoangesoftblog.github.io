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
}

module.exports = nextConfig
