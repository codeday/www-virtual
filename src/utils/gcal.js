import getConfig from 'next/config';
import axios from 'axios'
import LruCache from 'lru-cache';

const cache = new LruCache({ max: 60, maxAge: 60 * 1000 });

const { serverRuntimeConfig } = getConfig();

export const getEvents = async() => {
  if (!cache.has('events')) {
    let url = `https://www.googleapis.com/calendar/v3/calendars/${serverRuntimeConfig.gcal.calendarID}/events?key=${serverRuntimeConfig.gcal.apiKey}`
    const result = await axios.get(url)
    const events = []
    result.data.items
      .map((event) => {
        const [title, type] = event.summary.split(/:\s+/, 2).reverse();
        events.push({
          Date: event.start.dateTime,
          Title: title || 'TBD',
          Type: type || 'Event',
          Link: event.htmlLink || '',
          Description: event.description || '',
          Location: event.location || 'TBD',
          id: event.id,
        })
      })
    cache.set('events', events)
  }
  return cache.get('events')
};
export const getEvent = async(eventId) => {
  let events = await getEvents()
  return events.filter(event => event.id === eventId)[0];
};