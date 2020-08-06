import moment from 'moment';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import Skelly from '@codeday/topo/Atom/Skelly';
import Button from '@codeday/topo/Atom/Button';
import Content from '@codeday/topo/Molecule/Content';
import Slides from '@codeday/topo/Molecule/Slides';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import Page from '../components/Page';
import { getUpcoming } from '../utils/contentful';

export const getServerSideProps = async () => ({
  props: {
    upcoming: await getUpcoming(),
  }
});

export default function Home({ upcoming }) {
  if (!upcoming || upcoming.length === 0) {
    return (
      <Page slug="/">
        <Content>
          <Text fontSize="xl">There's no scheduled Virtual CodeDay. Check back later.</Text>
        </Content>
      </Page>
    )
  }

  const next = upcoming[0];
  next.startsAt = moment(next.startsAt.replace('Z', ''));
  next.endsAt = moment(next.endsAt.replace('Z', ''));

  return (
    <Page slug="/">
      <Content>
        <Text fontSize="2xl" textAlign="center" fontWeight="bold" color="current.textLight">
          {next.startsAt.format('MMMM D')} - {next.endsAt.format('MMMM D, YYYY')}
        </Text>
        <Heading as="h2" fontSize="5xl" textAlign="center">{next.title}</Heading>
        <Text fontSize="2xl" textAlign="center" fontWeight="bold" color="current.textLight">
          Join thousands of students to make new friends, and make an amazing app or game.<br />
          (Plus a virtual gaming tournament, workshops, prizes, and more!)
        </Text>
      </Content>
      <Content wide paddingTop={8} paddingBottom={8}>
        <Box position="relative" height="300px">
          <Skelly position="absolute" top={0} left={0} right={0} height="300px" marginBottom={0} borderRadius={0} />
          {next.themeBackgrounds.length > 0 && (
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
              {next.themeBackgrounds.map((bg) => (
                <Box
                  backgroundImage={`url(${bg.file.url}?h=300&w=1400&fit=thumb)`}
                  backgroundPosition="50% 50%"
                  backgroundSize="cover"
                  h="300px"
                />
              ))}
            </Slides>
          )}
          <Box position="absolute" top={{ base: 0, sm: "5em" }} left={0} right={0} color="white">
              <Text textAlign="center" fontSize="2xl" fontFamily="accent">The theme is...</Text>
              <Text textAlign="center" fontSize="6xl" fontFamily="accent" bold>&ldquo;{next.theme}&rdquo;</Text>
          </Box>
        </Box>
      </Content>
      <Content paddingBottom={8}>
        <Heading as="h3" fontSize="4xl" bold>FAQ:</Heading>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={6} paddingTop={3} paddingBottom={3}>
          <Box borderColor="current.border" borderWidth={1} borderRadius="sm" padding={8}>
            <Text fontSize="lg" bold>What can I make at Virtual CodeDay?</Text>
            <Text>
              Pretty much anything! Most people make apps or games, but you can also create an electronics project,
              write music for a game, create the art for an app, or something else we haven't even imagined!
            </Text>
            <Link href="http://virtual-codeday-spring-2020-projects.codeday.org/">See past projects</Link>
          </Box>

          <Box borderColor="current.border" borderWidth={1} borderRadius="sm" padding={8}>
            <Text fontSize="lg" bold>Can I participate if I don't know how to code?</Text>
            <Text>
              <Text bold as="span">Yes!</Text> In fact, many people who participate in CodeDay don't know how to code.
              You can attend our beginner-focused &ldquo;learn to make a game&rdquo; workshops, or join a team and help
              in another way.
            </Text>
          </Box>

          <Box borderColor="current.border" borderWidth={1} borderRadius="sm" padding={8}>
            <Text fontSize="lg" bold>Do I need to have a team?</Text>
            <Text>
              Nope! Everyone will be in our Discord chat, and we'll have everyone pitch at the start, so you'll be able
              to find a team suited to your interests. Or you can work by yourself!
            </Text>
          </Box>
        </Grid>
        More questions? <Button as="a" href="mailto:team@codeday.org">Contact us!</Button>
      </Content>
      <Content>
        <Heading as="h3" fontSize="4xl" bold>Register Now:</Heading>
        <Grid templateColumns={{ base: "1fr", md: "8fr 4fr" }} gap={8}>
          <Box>
            <CognitoForm formId={53} />
          </Box>
          <Box backgroundColor="red.50" borderRadius="sm" padding={4}>
            <Heading as="h3" fontSize="lg" bold>Date</Heading>
            <Text>{next.startsAt.format('MMMM DD')} - {next.endsAt.format('MMMM DD, YYYY')}</Text>

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
  )
}
