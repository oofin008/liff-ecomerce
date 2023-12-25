/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
      hostname: 'profile.line-scdn.net',
      protocol: 'https'
    }]
  }
}

module.exports = nextConfig
