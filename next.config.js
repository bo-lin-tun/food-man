/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msquarefdc.sgp1.digitaloceanspaces.com",
      },
      {
        protocol: "http",
        hostname: "***",
      },
    ],
  },
};

module.exports = nextConfig;
