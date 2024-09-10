/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/feed",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
