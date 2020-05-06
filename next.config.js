module.exports = {
  serverRuntimeConfig: {
    contentful: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      token: process.env.CONTENTFUL_TOKEN,
    },
  },
  publicRuntimeConfig: {
    appUrl: process.env.APP_URL,
  },
};
