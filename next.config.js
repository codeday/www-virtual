module.exports = {
  serverRuntimeConfig: {
    auth0: {
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
    },
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
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
    },
    appUrl: process.env.APP_URL,
    scheduleEnabled: !!(process.env.CALENDAR_ID),
    icsUrl: `https://calendar.google.com/calendar/ical/${process.env.CALENDAR_ID}/public/basic.ics`,
  },
};
