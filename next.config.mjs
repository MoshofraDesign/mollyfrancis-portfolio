/** @type {import('next').NextConfig} */
const nextConfig = {
  // No remotePatterns: every image the site uses is now in public/. The
  // Squarespace CDN hosts used to be allowed here, which is what let 110
  // images load from a subscription the site no longer depends on.
};

export default nextConfig;
