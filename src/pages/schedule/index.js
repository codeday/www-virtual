import React from 'react';
import Box, { Flex } from '@codeday/topo/Atom/Box'
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
  const preEventStart = moment(upcoming.startsAt).startOf('day').subtract(7, 'days');
  const preEventEnd = moment(upcoming.startsAt).startOf('day');
  const preEventWorkshops = calendarHydrated.filter((e) => e.Date.isBetween(preEventStart, preEventEnd));
  const timezone = typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Los_Angeles' : 'America/Los_Angeles';

  if (moment().isBefore(moment(upcoming.calendarReleaseDate || upcoming.startsAt))) {
    return (
      <Page slug="/schedule" title="Schedule">
        <Content textAlign="center">
          <Image src={photo.url} objectFit="cover" h="xs" w="100%" rounded={2} mt={-8} />
          <Heading size="lg" fontWeight="bold" mt={8}>
            The CodeDay team is still working on the schedule!
          </Heading>
          <Text>
            { upcoming.calendarReleaseDate
              ? 'We\'ll have it up on '+ moment.utc(upcoming.calendarReleaseDate).format('MMMM DD')
              : 'Check back soon' }.
          </Text>
          <Flex align="center" justify="center">
            <Text mb={0} pr={2}>Get an email when it's live:</Text>
            <MailingListSubscribe emailList="iiLfS763Z1TgytXns56X08OQ"/>
          </Flex>
          </Content>
      </Page>
    );
  }

  return (
    <Page slug="/schedule" title="Schedule">
      <Content>
        <Text mb={8}>
          You can add these events to your calender using this link: <Link href={publicRuntimeConfig.icsUrl}>ICS Format</Link><br />
          (In Google Calendar, find "Other calendars," click +, choose "From URL", and copy-paste that link.)
        </Text>
      </Content>
      {preEventWorkshops.length > 0 && (
        <Content mb={8}>
          <Box bg="blue.50" borderWidth={1} borderColor="blue.800" color="blue.900" p={4} rounded="sm">
            <Text bold>Pre-Event Workshops</Text>
            {preEventWorkshops.map((w) => (
              <Box mb={4}>
                <Link href={`/schedule/e/${w.id}`}>
                  {w.Title}
                </Link><br />
                {w.Date.clone().tz(timezone).format('dddd, MMMM DD YYYY @ h:mma')} your time
              </Box>
            ))}
          </Box>
        </Content>
      )}

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
