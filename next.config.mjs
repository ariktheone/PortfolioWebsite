/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable Next.js image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arijitmondal-portfolio.vercel.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
