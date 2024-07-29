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
    ],
  },
};

export default nextConfig;
