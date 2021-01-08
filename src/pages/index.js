import moment from 'moment';
import truncate from 'truncate';
import { apiFetch } from '@codeday/topo/utils';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Image from '@codeday/topo/Atom/Image';
import Text, { Link, Heading } from '@codeday/topo/Atom/Text';
import Skelly from '@codeday/topo/Atom/Skelly';
import Button from '@codeday/topo/Atom/Button';
import Content from '@codeday/topo/Molecule/Content';
import Slides from '@codeday/topo/Molecule/Slides';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import Page from '../components/Page';
import FaqAnswer from '../components/FaqAnswer';
import ShowN from '../components/ShowN';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home({ upcoming, globalSponsors, faqs, showYourWork }) {
  const [ session, loading ] = useSession()

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
          (Plus a virtual gaming tournament, workshops, prizes, and more!)<br />
          <Text d="inline-block" color="current.bg" bg="current.textLight" p={1} pl={4} pr={4} rounded="md">
            No prior experience needed!
          </Text>
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
      {globalSponsors && (
        <Content paddingBottom={8} textAlign="center">
            <Heading as="h3" color="current.textLight" fontSize="2xl" pb={4}>With support from...</Heading>
            <Box mb={8}>
              {globalSponsors.filter((sponsor) => sponsor.type === "major").map((sponsor, i) => (
                <Link to={sponsor.link}>
                  <Image d="inline-block" src={sponsor.logo.url} pr={i+1 === globalSponsors.length ? 0 : 8} />
                </Link>
              ))}
            </Box>
            <Box>
              {globalSponsors.filter((sponsor) => sponsor.type === "minor").map((sponsor, i) => (
                <Link to={sponsor.link}>
                  <Image d="inline-block" src={sponsor.logo.small} pr={i+1 === globalSponsors.length ? 0 : 8} />
                </Link>
              ))}
            </Box>
        </Content>
      )}

      <Content textAlign="center">
        <Button onClick={() => signIn('auth0', { callbackUrl: "http://localhost:3000/registration/address" })} variant="solid" variantColor="red" size="lg">
          Register Now
        </Button>
        <br></br>
        <>
          {!session && <>
            Not signed in <br/>
          </>}
          {session && <>
            Signed in as {session.user.name} <br/>
          </>}
        </>
      </Content>

      {startsAt.isBefore(moment()) && endsAt.isAfter(moment()) && showYourWork?.length > 0 && (
        <Box bg="gray.50">
          <Content pb={8} pt={8}>
            <Heading as="h3" fontSize="4xl" textAlign="center" mb={4} bold>Recent Progress:</Heading>
            <Grid templateColumns="repeat(4, 1fr)" d={{ base: 'none', lg: 'grid' }} gap={4}>
              <ShowN n={4} duration={5000}>
                {showYourWork.map((msg) => (
                  <Box bg="white" p={4}>
                    <Box pb={4}>
                      <Image
                        src={msg.author.picture.replace('256x256', '32x32')}
                        alt=""
                        float="left"
                        w={6}
                        h={6}
                        mr={2}
                        rounded="full"
                      />
                      <Text mb={0}>{msg.author.name}</Text>
                    </Box>
                    <Image pb={4} src={msg.imageUrl} alt="" />
                    <Text>{truncate(msg.text, 140)}</Text>
                  </Box>
                ))}
              </ShowN>
            </Grid>
          </Content>
        </Box>
      )}


      <Content paddingBottom={8} textAlign="center">
        <Heading as="h3" fontSize="4xl" bold>FAQ:</Heading>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={6} paddingTop={3} paddingBottom={3} textAlign="left">
          {faqs.map((faq) => (
            <Box borderColor="current.border" borderWidth={1} borderRadius="sm" padding={8} key={faq.title}>
              <Text fontSize="lg" bold>{faq.title}</Text>
              <Text><FaqAnswer json={faq.answer.json} /></Text>
            </Box>
          ))}
        </Grid>
        More questions?<br />
        <Button as="a" href="https://www.codeday.org/help/virtual" target="_blank">View all FAQs</Button>
        {' '}or{' '}
        <Button as="a" href="mailto:team@codeday.org">contact us!</Button>
      </Content>
      <Content id="register">
        <Grid templateColumns={{ base: '1fr', md: '8fr 4fr' }} gap={8}>
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

function smoothScroll() {
  document.querySelector('#register').scrollIntoView({
      behavior: 'smooth'
  });
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
            url(transform: { width: 1400, height: 400, quality: 90, resizeStrategy: FILL })
          }
        }
        kickoffVideo {
          url
        }
      }
    }

    globalSponsors (order: sys_firstPublishedAt_ASC) {
      items{
        link
        name
        type
        logo{
          url(transform:{height: 60})
          small: url(transform:{height: 20})
        }
      }
    }

      faqs (
        where: {
          program: {webname:"virtual"},
          audience_contains_all: ["Student"]
        },
        order: [featured_DESC, sys_firstPublishedAt_ASC],
        limit: 3,
      ) {
        items {
          title
          answer {
            json
          }
        }
      }
    }

    showYourWork {
      messages (take: 16) {
        text
        imageUrl(width: 300, height: 200, strategy: FILL, fillBlur: true)
        author {
          name
          pronoun
          picture
        }
      }
    }
  }`;

  export async function getStaticProps() {
    const data = await apiFetch(query());
    return {
      props: {
        upcoming: data?.cms?.events?.items[0] || null,
        globalSponsors: data?.cms?.globalSponsors?.items || [],
        faqs: data?.cms?.faqs?.items || [],
        showYourWork: data?.showYourWork?.messages || [],
      },
      revalidate: 120,
    }
  };
