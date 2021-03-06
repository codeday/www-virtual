import getConfig from 'next/config';
import axios from 'axios';
import LruCache from 'lru-cache';

const cache = new LruCache({ max: 60, maxAge: 60 * 1000 });

const { serverRuntimeConfig } = getConfig();
// TODO:  at some point, store events in the database in case of extended google api downtime
export const getEvents = async () => {
  if (!cache.has('events')) {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${serverRuntimeConfig.gcal.calendarID}`
              + `/events?key=${serverRuntimeConfig.gcal.apiKey}`;
    const result = await axios.get(url);
    const events = result.data.items
      .filter((event) => event.summary)
      .filter((event) => event.visibility && ['public'].includes(event.visibility))
      .map((event) => {
        const [title, type] = event.summary.split(/:\s+/, 2).reverse();
        return {
          Date: event.start.dateTime,
          Title: title || 'TBD',
          Type: type || 'Event',
          Link: event.htmlLink || '',
          Description: event.description || '',
          Location: event.location || 'TBD',
          id: event.id,
        };
      });

    const sortedEvents = events.sort(
      (a, b) => Date.parse(a.Date) - Date.parse(b.Date)
    ); // Use .sort() because sortBy in google calendar api didnt work for some reason
    cache.set('events', sortedEvents);
  }

  return cache.get('events');
};
export const getEvent = async (eventId) => {
  const events = await getEvents();
  return events.filter((event) => event.id === eventId)[0];
};
