/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        domains: ['firebasestorage.googleapis.com'],
        unoptimized: true,
    },
};

export default nextConfig;