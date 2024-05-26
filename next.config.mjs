/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    BACKEND_SERVER_ENDPOINT: process.env.BACKEND_SERVER_ENDPOINT,
  },
};

export default nextConfig;
