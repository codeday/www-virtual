import moment from 'moment';
import { apiFetch } from '@codeday/topo/utils';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Skelly from '@codeday/topo/Atom/Skelly';
import Button from '@codeday/topo/Atom/Button';
import Content from '@codeday/topo/Molecule/Content';
import Slides from '@codeday/topo/Molecule/Slides';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import Page from '../components/Page';
import FaqAnswer from '../components/FaqAnswer';

export default function Home({ upcoming, faqs }) {
  if (!upcoming || upcoming.length === 0) {
    return (
      <Page slug="/">
        <Content>
          <Text fontSize="xl">There's no scheduled Virtual CodeDay. Check back later.</Text>
        </Content>
      </Page>
    );
  }

  const { theme, title, themeBackgrounds, kickoffVideo } = upcoming;
  const startsAt = moment(upcoming.startsAt.replace('Z', ''));
  const endsAt = moment(upcoming.endsAt.replace('Z', ''));

  return (
    <Page slug="/">
      <Content>
        <Text fontSize="2xl" textAlign="center" fontWeight="bold" color="current.textLight">
          {startsAt.format('MMMM D')} - {endsAt.format('MMMM D, YYYY')}
        </Text>
        <Heading as="h2" fontSize="5xl" textAlign="center">{title}</Heading>
        <Text fontSize="2xl" textAlign="center" fontWeight="bold" color="current.textLight">
          Join thousands of students to make new friends, and make an amazing app or game.<br />
          (Plus a virtual gaming tournament, workshops, prizes, and more!)
        </Text>
      </Content>
      {theme && (
        <Content wide paddingTop={8} paddingBottom={8}>
          <Box position="relative" height="300px">
            <Skelly position="absolute" top={0} left={0} right={0} height="300px" marginBottom={0} borderRadius={0} />
            {themeBackgrounds.items.length > 0 && (
              <Slides
                height="300px"
                borderRadius="md"
                position="absolute"
                top={0}
                left={0}
                right={0}
                style={{ filter: 'brightness(50%)' }}
                duration={5}
              >
                {themeBackgrounds.items.map((bg) => (
                  <Box
                    key={bg.url}
                    backgroundImage={`url(${bg.url})`}
                    backgroundPosition="50% 50%"
                    backgroundSize="cover"
                    h="300px"
                  />
                ))}
              </Slides>
            )}
            <Box position="absolute" top={{ base: 0, sm: '5em' }} left={0} right={0} color="white">
              <Text textAlign="center" fontSize="2xl" fontFamily="accent">The theme is...</Text>
              <Text textAlign="center" fontSize="6xl" fontFamily="accent" bold>&ldquo;{theme}&rdquo;</Text>
            </Box>
          </Box>
        </Content>
      )}
      <Content paddingBottom={8}>
        <Heading as="h3" fontSize="4xl" bold>FAQ:</Heading>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={6} paddingTop={3} paddingBottom={3}>
          {faqs.map((faq) => (
            <Box borderColor="current.border" borderWidth={1} borderRadius="sm" padding={8} key={faq.title}>
              <Text fontSize="lg" bold>{faq.title}</Text>
              <Text><FaqAnswer json={faq.answer.json} /></Text>
            </Box>
          ))}
        </Grid>
        More questions? <Button as="a" href="mailto:team@codeday.org">Contact us!</Button>
      </Content>
      <Content>
        <Heading as="h3" fontSize="4xl" bold>Register Now:</Heading>
        <Grid templateColumns={{ base: '1fr', md: '8fr 4fr' }} gap={8}>
          <Box>
            <CognitoForm formId={53} />
          </Box>
          <Box backgroundColor="red.50" borderRadius="sm" padding={4}>
            <Heading as="h3" fontSize="lg" bold>Date</Heading>
            <Text>{startsAt.format('MMMM DD')} - {endsAt.format('MMMM DD, YYYY')}</Text>

            <Heading as="h3" fontSize="lg" bold>Location</Heading>
            <Text>100% online, using Discord and Twitch.</Text>

            <Heading as="h3" fontSize="lg" bold>Eligibility</Heading>
            <Text>Anyone enrolled in a middle school, high school, or college.</Text>

            <Heading as="h3" fontSize="lg" bold>Cost</Heading>
            <Text>Free!</Text>
          </Box>
        </Grid>
      </Content>
    </Page>
  );
}

const query = () => `{
  cms {
    events(
      limit: 1,
      order: startsAt_ASC,
      where: {
        program: { webname: "virtual" }
        endsAt_gte: "${(new Date((new Date()).getTime() - (1000 * 60 * 60 * 24))).toISOString()}"
      }
    ) {
      items {
        title
        theme
        startsAt
        endsAt
        themeBackgrounds {
          items {
            url(transform: { width: 1400, height: 400, quality: 90 })
          }
        }
        kickoffVideo {
          url
        }
      }
    }


    faqs (
      where: {
        program: {webname:"virtual"},
        audience_contains_all: ["Student"]
      },
      order: [featured_DESC, sys_firstPublishedAt_ASC]
    ) {
      items {
        title
        answer {
          json
        }
      }
    }
  }
}`;

export async function getStaticProps() {
  const data = await apiFetch(query());
  return {
    props: {
      upcoming: data?.cms?.events?.items[0] || null,
      faqs: data?.cms?.faqs?.items || [],
    },
    revalidate: 120,
  }
};
