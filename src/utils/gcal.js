import getConfig from 'next/config';
import axios from 'axios'


const { serverRuntimeConfig } = getConfig();

export const getEvents = async() => {
// export means that this function will be available to any module that imports this module
  let url = `https://www.googleapis.com/calendar/v3/calendars/${serverRuntimeConfig.gcal.calendarID}/events?key=${serverRuntimeConfig.gcal.apiKey}`
  const result = await axios.get(url)
  const events = []
  let typeExp = /(?:(\w*): )?(.*)/g
  result.data.items
    .map((event) => {
      console.log(event.summary)
      let typeMatch = typeExp.exec(event.summary)
      console.log(typeMatch)
      events.push({
        Date: event.start.dateTime,
        Title: typeMatch[2] || 'TBD',
        Type: typeMatch[1] || 'Event',
        Description: event.description || '',

        id: event.id,
      })
    })
  return events
};
export const getEvent = async(eventId) => {
  let url = `https://www.googleapis.com/calendar/v3/calendars/${serverRuntimeConfig.gcal.calendarID}/events/${eventId}?key=${serverRuntimeConfig.gcal.apiKey}`
  const result = await axios.get(url)
  console.log(result.data)
  return result.data
};