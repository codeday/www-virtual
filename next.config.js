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
    mysql: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  },
  publicRuntimeConfig: {
    appUrl: process.env.APP_URL,
  },
};
