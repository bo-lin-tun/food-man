/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
       {
       protocol: "https",
       hostname: "msquarefdc.sgp1.digitaloceanspaces.com",
       },
      // {
        // protocol: "https",
        // hostname: "***",
      // },
    ],
  },
};

module.exports = nextConfig;
