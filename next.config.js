/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Wildcard for any protocol
        hostname: "*", // Wildcard for any hostname
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
};

module.exports = nextConfig;
