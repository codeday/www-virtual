import React from 'react';
import moment from 'moment-timezone';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Link } from '@codeday/topo/Atom/Text';
import getConfig from 'next/config';
import Page from '../../components/Page';
import Calendar from '../../components/Calendar';
import { getEvents } from '../../utils/gcal';

const { publicRuntimeConfig } = getConfig();
export const getServerSideProps = async () => {
  let calendar = null;
  try {
    calendar = await getEvents();
  } catch (err) {
    console.error(err);
  }
  return {
    props: {
      calendar: calendar || [],
    },
  };
};

export default function Home({ calendar }) {
  const calendarHydrated = calendar.map((e) => ({ ...e, Date: moment(e.Date) }));

  if (calendar.length === 0) {
    return (
      <Page slug="/schedule" title="Schedule">
        <Content>
          <Text mb={16}>
            The schedule is not currently available. Check back soon.
          </Text>
        </Content>
      </Page>
    );
  }

  return (
    <Page slug="/schedule" title="Schedule">
      <Content>
        <Text mb={16}>
          You can add these events to your calender using this link: <Link href={publicRuntimeConfig.icsUrl}>ICS Format</Link><br />
          (In Google Calendar, find "Other calendars," click +, choose "From URL", and copy-paste that link.)
        </Text>
      </Content>
      <Calendar calendar={calendarHydrated} />
    </Page>
  );
}
