/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.store.vivo.com.br",
        port: "",
        pathname: "/**/**",
      },
      {
        protocol: "https",
        hostname: "www.ascm.org",
        port: "",
        pathname: "/**/**",
      },
    ],
  },
};

export default nextConfig;
