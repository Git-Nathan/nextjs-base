/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "42.119.154.58",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
