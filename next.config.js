/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    liffId: "process.env.LIFF_ID",
  },
  images: {
    remotePatterns: [{
      hostname: 'profile.line-scdn.net',
      protocol: 'https'
    }]
  }
}

module.exports = nextConfig
