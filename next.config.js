/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/login", // Redireciona a página inicial para /login
          permanent: true,
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  