/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: false },
  serverRuntimeConfig: { PROJECT_ROOT: __dirname },
  images: { domains: ["localhost", "vercel.app", "ayedot.com"] },

  async rewrites() {
    // In dev, redirect the failing counter call to a safe dummy endpoint
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/api/count",
            destination: "/api/fake", // we’ll create this next
          },
        ]
      : [];
  },
};