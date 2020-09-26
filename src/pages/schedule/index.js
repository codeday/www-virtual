import React from 'react';
import { Grid } from '@codeday/topo/Atom/Box'
import moment from 'moment-timezone';
import {apiFetch} from '@codeday/topo/utils';
import Content from '@codeday/topo/Molecule/Content';
import Text, {Heading, Link} from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import getConfig from 'next/config';
import Page from '../../components/Page';
import Calendar from '../../components/Calendar';
import {getEvents} from '../../utils/gcal';
import MailingListSubscribe from '@codeday/topo/Organism/MailingListSubscribe'
const { publicRuntimeConfig } = getConfig();

export default function Home({ calendar, upcoming, photo }) {
  const calendarHydrated = calendar.map((e) => ({ ...e, Date: moment(e.Date) }));
  if (moment().isBefore(moment(upcoming.calendarReleaseDate || upcoming.startsAt))) {
    return (
      <Page slug="/schedule" title="Schedule">
        <Content textAlign="center">
          <Image src={photo.url} objectFit="cover" h="25vh" w="100%"/>
          <Heading size="lg" fontWeight="bold">
            The CodeDay team is still working on the schedule!
          </Heading>
          <Text>
            { upcoming.calendarReleaseDate
              ? 'We\'ll have it up on '+moment(upcoming.calendarReleaseDate).format('MMMM DD')
              : 'Check back soon' }.
          </Text>
          <Grid templateColumns="max-content 1fr" gap={8} alignItems="center">
          <Text mb={0}>Get an email when it's live: </Text>
          <MailingListSubscribe maxWidth={24} emailList="iiLfS763Z1TgytXns56X08OQ"/>
          </Grid>
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
