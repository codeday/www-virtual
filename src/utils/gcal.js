import getConfig from 'next/config';
import axios from 'axios'


const { serverRuntimeConfig } = getConfig();

export const getEvents = async() => {
// export means that this function will be available to any module that imports this module
  let url = `https://www.googleapis.com/calendar/v3/calendars/${serverRuntimeConfig.gcal.calendarID}/events?key=${serverRuntimeConfig.gcal.apiKey}`
  const result = await axios.get(url)
  const events = []
  result.data.items
    .map((event) => {
      events.push({
        Date: event.start.dateTime,
        Title: event.summary,
        Type: 'Event',
        Description: event.description || '',

        id: event.id,
      })
    })
  return events
};
export const getEvent = async(eventId) => {
  let url = `https://www.googleapis.com/calendar/v3/calendars/${serverRuntimeConfig.gcal.calendarID}/events/${eventId}?key=${serverRuntimeConfig.gcal.apiKey}`
  const result = await axios.get(url)
  return result.data
};