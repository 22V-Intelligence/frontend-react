/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: [
			'localhost',
			'127.0.0.1',
			'lobster-app-823vy.ondigitalocean.app',
			'22vi-strapi-aws-media-bucket.s3.us-west-1.amazonaws.com',
		],
	},
	env: {
		// APP_URL: 'https://lobster-app-823vy.ondigitalocean.app',
		APP_URL: 'http://127.0.0.1:1337',
		STRAPI_NEXT_READ_API_KEY:
			'dda04e20cbdff7ef823b4fd9ce33e8905f5b0c40d5a338bae38c897976245db78476403ed4bd5585870fa68ebc8da7c9684aec01048701259c6b8a3eee3cac1cd6b8b25732fd4599eeadcaece8d0605aad110c92090107ffe0653ffe9c69c638a6b190ea7882669581ec28877a4dbb762d03f3a71a9bd4404aa1cc9517f8fe0c',
		STRAPI_PAGE_LIMIT: 6,
	},
};

module.exports = nextConfig;
