import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getBackendUrl() {
  if (process.env.BACKEND_URL) return process.env.BACKEND_URL;
  let port = process.env.BACKEND_PORT || process.env.PORT;
  if (!port) {
    try {
      const rootEnv = fs.readFileSync(path.resolve(__dirname, '../../.env'), 'utf8');
      const match = rootEnv.match(/^PORT\s*=\s*(.+)$/m);
      if (match) port = match[1].trim().replace(/^["']|["']$/g, '');
    } catch (e) {}
  }
  return `http://localhost:${port || 5001}`;
}

const backendUrl = getBackendUrl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
      {
        source: '/auth/:path*',
        destination: `${backendUrl}/auth/:path*`,
      },
      {
        source: '/health',
        destination: `${backendUrl}/health`,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
};

export default nextConfig;
