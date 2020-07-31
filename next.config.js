module.exports = {
  serverRuntimeConfig: {
    contentful: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      token: process.env.CONTENTFUL_TOKEN,
    },
    gcal: {
      calendarID: process.env.CALENDAR_ID,
      apiKey: process.env.API_KEY,
    },
  },
  publicRuntimeConfig: {
    appUrl: process.env.APP_URL,
  },
};
