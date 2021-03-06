import moment from 'moment-timezone';
import { print } from 'graphql';
import { apiFetch } from '@codeday/topo/utils';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Skelly from '@codeday/topo/Atom/Skelly';
import Button from '@codeday/topo/Atom/Button';
import Content from '@codeday/topo/Molecule/Content';
import Slides from '@codeday/topo/Molecule/Slides';
import Divider from '@codeday/topo/Atom/Divider';
import Sponsors from '../components/Sponsors';
import Page from '../components/Page';
import Explainer from '../components/Explainer';
import FaqAnswer from '../components/FaqAnswer';
import PastProjects from '../components/PastProjects';
import RegisterButton from '../components/RegisterButton';
import StudentQuotes from '../components/StudentQuotes';
import { IndexQuery } from './index.gql';
import ThemeNotifier from '../components/ThemeNotifier';
import RichText from '../components/RichText';

export default function Home({ upcoming, query, faqs, random }) {
  if (!upcoming || upcoming.length === 0) {
    return (
      <Page slug="/">
        <Content>
          <Text fontSize="xl">
            There's no scheduled Virtual CodeDay. Check back later.
          </Text>
        </Content>
      </Page>
    );
  }

  const { theme, themeBackgrounds, title } = upcoming;
  const startsAt = moment(upcoming.startsAt.replace("Z", ""));
  const endsAt = moment(upcoming.endsAt.replace("Z", ""));
  const timezone = typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Los_Angeles' : 'America/Los_Angeles';

  return (
    <Page slug="/">
      {upcoming.notice && (
        <Content mt={-8}>
          <Box
            p={4}
            pb={0}
            bg="purple.100"
            borderColor="purple.600"
            borderWidth={1}
            color="purple.900"
            rounded="sm"
          >
            <Text mb={0}>
              <RichText document={upcoming.notice.json} />
            </Text>
          </Box>
        </Content>
      )}

      <Content wide>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} alignItems="center" gap={8} mb={12}>
          <Box textAlign={{ base: 'center', md: 'left' }}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="current.textLight"
              mb={0}
            >
              {startsAt.format("MMMM D")} - {endsAt.format("MMMM D, YYYY")}
              <br />
              Starts at {startsAt.tz(timezone).format("LT z")}
            </Text>
            <Heading as="h2" fontSize="5xl" mb={2}>
              {title}
            </Heading>
            <Text color="red.700" bold mb={2}>
              No prior coding experience needed!
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mb={0}>
              The most beginner-friendly coding event on the internet
            </Text>
            <Text fontSize="lg">
              Join thousands of students to make new friends, get guidance from industry professional mentors, and make an amazing app or game in just 48 hours!
            </Text>
            <RegisterButton />
          </Box>
          <Box>
            <Divider d={{ base: 'block', md: 'none' }} mb={16} />
            <PastProjects random={random} query={query} />
          </Box>
        </Grid>
      </Content>

      <Content wide pt={8} pb={8}>
        <Explainer mt={12} mb={12} startsAt={startsAt} />
        <Divider />
      </Content>

      {(theme || themeBackgrounds?.items?.length > 0) && (
        <>
          <Content>
            <ThemeNotifier event={upcoming} />
          </Content>
          <Content wide mb={16} mt={16}><Divider /></Content>
        </>
      )}


      <Content wide d={{ base: 'none', md: 'block' }} mb={12}>
        <StudentQuotes query={query} />
      </Content>


      <Content paddingBottom={8} textAlign="center">
        <Heading as="h3" fontSize="4xl" bold>
          FAQ:
        </Heading>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
          gap={6}
          paddingTop={3}
          paddingBottom={3}
          textAlign="left"
        >
          {faqs.map((faq) => (
            <Box
              borderColor="current.border"
              borderWidth={1}
              borderRadius="sm"
              padding={8}
              key={faq.title}
            >
              <Text fontSize="lg" bold>
                {faq.title}
              </Text>
              <FaqAnswer json={faq.answer.json} />
            </Box>
          ))}
        </Grid>
        More questions?
        <br />
        <Button
          as="a"
          href="https://www.codeday.org/help/virtual"
          target="_blank"
        >
          View all FAQs
        </Button>{" "}
        or{" "}
        <Button as="a" href="mailto:team@codeday.org">
          contact us!
        </Button>
      </Content>

      <Sponsors query={query} />
    </Page>
  );
}

function smoothScroll() {
  document.querySelector("#register").scrollIntoView({
    behavior: "smooth",
  });
}

export async function getStaticProps() {
  const data = await apiFetch(print(IndexQuery), {
    endDate: (new Date(new Date().getTime())).toISOString(),
  });
  return {
    props: {
      upcoming: data?.cms?.events?.items[0] || null,
      faqs: data?.cms?.faqs?.items || [],
      query: data,
      random: Math.random(),
    },
    revalidate: 300,
  };
}
