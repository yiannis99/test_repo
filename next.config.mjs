/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
	output: 'export',
	basePath: isProd ? '/test_repo' : '',
	reactStrictMode: true,
};

export default nextConfig;
