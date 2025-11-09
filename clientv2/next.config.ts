import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output configuration for Azure Static Web Apps
  // Use 'export' for static generation or remove for hybrid rendering with Azure SWA
  // output: 'export',
  
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
    // Disable image optimization for static export if using output: 'export'
    // unoptimized: true,
  },
  
  // Optional: Enable if you need trailing slashes
  // trailingSlash: true,
};

export default nextConfig;
