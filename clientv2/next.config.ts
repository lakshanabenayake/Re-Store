import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output configuration for Azure Static Web Apps
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
  
  // Optional: Enable if you need trailing slashes
  // trailingSlash: true,
};

export default nextConfig;
