module.exports = {
  siteUrl: 'https://perfecttv.fr',
  generateRobotsTxt: true,
  sitemapSize: 5000,

  exclude: [
    '/admin/*',
    '/api/*',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}