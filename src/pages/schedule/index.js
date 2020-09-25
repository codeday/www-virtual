import React from 'react';
import moment from 'moment-timezone';
import { apiFetch } from '@codeday/topo/utils';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Link, Heading } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import getConfig from 'next/config';
import Page from '../../components/Page';
import Calendar from '../../components/Calendar';
import { getEvents } from '../../utils/gcal';

const { publicRuntimeConfig } = getConfig();

export default function Home({ calendar, upcoming, photo }) {
  const calendarHydrated = calendar.map((e) => ({ ...e, Date: moment(e.Date) }));
  if (moment().isBefore(moment(upcoming.calendarReleaseDate || upcoming.startsAt))) {
    return (
      <Page slug="/schedule" title="Schedule">
        <Content>
          <Heading size="md">
            <Image src={photo.url}/>
            The CodeDay team is still working on the schedule! { upcoming.calendarReleaseDate ? 'We\'ll have it up on '+moment(upcoming.calendarReleaseDate).format('MMMM DD'): 'Check back soon' }.
          </Heading>
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
      <Calendar calendar={calendarHydrated} displayStarts={moment(upcoming.startsAt)} displayEnds={moment(upcoming.endsAt)} />
    </Page>
  );
}


const query = () => `{
  cms {
    events(
      limit: 1
      order: startsAt_ASC
      where: {
        program: { webname: "virtual" }
        endsAt_gte: "${(new Date((new Date()).getTime() - (1000 * 60 * 60 * 24))).toISOString()}"
        }
    ) {
      items {
        startsAt
        endsAt
        calendarReleaseDate
      }
    }
    pressPhotos(
      limit: 1
      where: {
        tags_contains_all: "brainstorm"
      }
    ) {
      items {
        photo{
          url
        }
      }
    }
  }
}`;

export async function getStaticProps() {
  const data = await apiFetch(query());
  let calendar = null;
  try {
    calendar = await getEvents();
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      upcoming: data?.cms?.events?.items[0] || null,
      calendar: calendar || [],
      photo: data?.cms?.pressPhotos?.items[0]?.photo || null
    },
    revalidate: 120,
  }
};
