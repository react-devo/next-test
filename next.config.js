/** @type {import('next').NextConfig} */
const nextConfig = {

  env: (process.env.NODE_ENV === 'development' ? {
    API_BASE_URL: 'https://reqres.in/api',
    GOOGLE_CLIENT_ID: '864983917151-sl5tctj5r09q68itb2ki6du5kldm75ds.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    AUTH_REDIRECT_URL: "http://localhost:3000"
  } : {
    API_BASE_URL: 'https://reqres.in/api',
    GOOGLE_CLIENT_ID: '864983917151-sl5tctj5r09q68itb2ki6du5kldm75ds.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    AUTH_REDIRECT_URL: "https://exquisite-raindrop-8114a5.netlify.app"
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https:/lh3.googleusercontent.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
    domains: ['lh3.googleusercontent.com']


  },

}

module.exports = nextConfig
