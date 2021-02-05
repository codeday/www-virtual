import moment from 'moment';
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
import FaqAnswer from '../components/FaqAnswer';
import PastProjects from '../components/PastProjects';
import RegisterButton from '../components/RegisterButton';
import StudentQuotes from '../components/StudentQuotes';
import { IndexQuery } from './index.gql';

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

  const { theme, title, themeBackgrounds } = upcoming;
  const startsAt = moment(upcoming.startsAt.replace("Z", ""));
  const endsAt = moment(upcoming.endsAt.replace("Z", ""));

  return (
    <Page slug="/">
      <Content mt={-8}>
        <Box
          p={4}
          bg="purple.100"
          borderColor="purple.600"
          borderWidth={1}
          color="purple.900"
          rounded="sm"
        >
          <Text mb={0}>
            <Text as="span" bold>Register soon &mdash;</Text> we have free stickers and swag while supplies last! You
            can also apply for a Beginner Electronics Kit provided for free by our friends at Digi-Key!
          </Text>
        </Box>
      </Content>

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
            </Text>
            <Heading as="h2" fontSize="5xl" mb={2}>
              {title}
            </Heading>
            <Text color="red.700" bold mb={2}>
              No prior coding experience needed!
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mb={0}>
              Join thousands of students to make new friends, and make an amazing
              app or game.
            </Text>
            <Text fontSize="lg">
              Plus a virtual gaming tournament, workshops, awards, ...
            </Text>
            <RegisterButton />
          </Box>
          <Box>
            <Divider d={{ base: 'block', md: 'none' }} mb={16} />
            <PastProjects random={random} query={query} />
          </Box>
        </Grid>
      </Content>

      <Content d={{ base: 'none', md: 'block' }} mb={12}>
        <StudentQuotes query={query} />
      </Content>

      {theme && (
        <Content wide mb={12}>
          <Box position="relative" height="300px">
            <Skelly
              position="absolute"
              top={0}
              left={0}
              right={0}
              height="300px"
              marginBottom={0}
              borderRadius={0}
            />
            {themeBackgrounds.items.length > 0 && (
              <Slides
                height="300px"
                borderRadius="md"
                position="absolute"
                top={0}
                left={0}
                right={0}
                style={{ filter: "brightness(50%)" }}
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
            <Box
              position="absolute"
              top={{ base: 0, sm: "5em" }}
              left={0}
              right={0}
              color="white"
            >
              <Text textAlign="center" fontSize="2xl" fontFamily="accent">
                The theme is...
              </Text>
              <Text textAlign="center" fontSize="6xl" fontFamily="accent" bold>
                &ldquo;{theme}&rdquo;
              </Text>
            </Box>
          </Box>
        </Content>
      )}

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
    endDate: (new Date(new Date().getTime() - 1000 * 60 * 60 * 24)).toISOString(),
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
