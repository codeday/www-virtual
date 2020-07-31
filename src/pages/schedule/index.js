import moment from 'moment-timezone';
import { Content } from '@codeday/topo/atom/Box';
import Text, { Link } from '@codeday/topo/atom/Text';
import Page from '../../components/Page';
import Calendar from '../../components/Calendar';
import { getEvents } from '../../utils/gcal';

export const getServerSideProps = async () => {
  let calendar;
  try {
    calendar = await getEvents();
  } catch (err) {
    console.error('airtable is down (again) and the cache is empty.');
  }
  return {
    props: {
      calendar,
    },
  };
};

export default function Home({ calendar }) {
  const calendarHydrated = calendar.map((e) => ({ ...e, Date: moment.utc(e.Date).tz('America/Los_Angeles') }));

  return (
    <Page slug="/schedule" title="Schedule">
      <Content>
        <Text mb={16}>
          You can add these events to your calender using this link: <Link href="/api/ics">ICS Format</Link><br />
          (In Google Calendar, find "Other calendars," click +, choose "From URL", and copy-paste that link.)
        </Text>
      </Content>
      <Calendar calendar={calendarHydrated} />
    </Page>
  );
}
