/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "msquarefdc.sgp1.digitaloceanspaces.com",
      // },
      {
        protocol: "https",
        hostname: "***",
      },

      // {
      //   protocol: "https",
      //   hostname: "msquarefdc.sgp1.digitaloceanspaces.com",
      // },
      // {
      //   protocol: "http",
      //   hostname: "***",
      // },
    ],
  },
  async headers() {
    return [
      {
        // Set CORS headers to allow requests from any origin
        source: "/api/:path*", // Adjust the source path as needed
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allow requests from any origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS", // Allow specified HTTP methods
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Origin, X-Requested-With, Content-Type, Accept", // Allow specified headers
          },
        ],
      },
    ];
  },
};

module.exports = {
  images: {
    domains: ['localhost:3000'],
  },
}
