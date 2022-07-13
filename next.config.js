/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.pixabay.com',
      'image.shutterstock.com',
    ],
  },
  swcMinify: true,
}

module.exports = nextConfig
