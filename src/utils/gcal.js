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
  console.log(events)
  return events
}
export function getEvent (callback, eventId) {
  let url = `https://www.googleapis.com/calendar/v3/calendars/${serverRuntimeConfig.gcal.calendarID}/events/${eventId}?key=${serverRuntimeConfig.gcal.apiKey}`
  axios
    .get(url)
    .end((err, resp) => {
      if (!err) {
        // create array to push events into
        const events = []
        // in practice, this block should be wrapped in a try/catch block,
        // because as with any external API, we can't be sure if the data will be what we expect
        JSON.parse(resp.text).items.map((event) => {
          events.push({
            // an event from Google Calendar can be a full day event or a regular one
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
          })
        })
        callback(events)
      }
    })
}