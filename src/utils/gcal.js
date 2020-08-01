import getConfig from 'next/config';
import axios from 'axios'
import LruCache from 'lru-cache';

const cache = new LruCache({ max: 60, maxAge: 60 * 1000 });

const { serverRuntimeConfig } = getConfig();

export const getEvents = async() => {
// export means that this function will be available to any module that imports this module
  let url = `https://www.googleapis.com/calendar/v3/calendars/${serverRuntimeConfig.gcal.calendarID}/events?key=${serverRuntimeConfig.gcal.apiKey}`
  const result = await axios.get(url)
  const events = []
  let typeExp = /(?:(\w*): )?(.*)/g
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
  return events
};
export const getEvent = async(eventId) => {
  let url = `https://www.googleapis.com/calendar/v3/calendars/${serverRuntimeConfig.gcal.calendarID}/events/${eventId}?key=${serverRuntimeConfig.gcal.apiKey}`
  const result = await axios.get(url)
  let event = result.data
  return {

  }
};