/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*',
      },
    ];
  },
  env: {
    NEXT_PUBLIC_BACKEND_SERVER_ENDPOINT:
      process.env.NEXT_PUBLIC_BACKEND_SERVER_ENDPOINT,
  },
};

export default nextConfig;
