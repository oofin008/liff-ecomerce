/** @type {import('next').NextConfig} */
const { i18n } = require('./next-18next.config');

const nextConfig = {
  reactStrictMode: true,
  env: {
    LIFF_ID: process.env.NEXT_PUBLIC_LIFF_ID
  },
  i18n,
  images: {
    remotePatterns: [{
      hostname: 'profile.line-scdn.net',
      protocol: 'https'
    }]
  }
}

module.exports = nextConfig
