import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone for Azure Static Web Apps with managed functions
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
