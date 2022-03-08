module.exports = {
  reactStrictMode: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/publicChannel/1',
        permanent: true
      }
    ]
  }
}
