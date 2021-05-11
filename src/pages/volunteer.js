import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import { apiFetch } from '@codeday/topo/utils';
import Content from '@codeday/topo/Molecule/Content';
import Image from '@codeday/topo/Atom/Image';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Button from '@codeday/topo/Atom/Button';
import FilePdf from '@codeday/topocons/Icon/FilePdf';
import UiArrowDown from '@codeday/topocons/Icon/UiArrowDown';
import UiArrowUp from '@codeday/topocons/Icon/UiArrowUp';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import ContentfulRichText from '../components/ContentfulRichText';
import Page from '../components/Page';
import FaqAnswer from '../components/FaqAnswer';
import Divider from '@codeday/topo/Atom/Divider';
import Link from '@codeday/topo/Atom/Text/Link';

export default function Volunteer({ faqs, volunteer }) {
  const [blurbVisible, setBlurbVisible] = useState(false);

  return (
    <Page slug="/volunteer" title="Volunteer">
      <Content mt={-8}>
        <Heading as="h2" mb={8}>Help students get started in tech at Virtual CodeDay.</Heading>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
          <Box>
            <Text>Virtual CodeDay helps newcomers find their place in tech. We need your help to make that happen.</Text>
            <Text>
              We're looking for mentors, judges, workshop hosts, and general volunteers to help support students as they
              learn to build apps and games of their own design.
            </Text>
            <Text>
              Filling out this form isn't a binding commitment, we'll reach out in a few days after reviewing your app.
            </Text>
          </Box>
          <Box display={{ base: 'none', lg: 'block' }} bg="#000">
            <ReactPlayer
              url="https://stream.mux.com/yoEuEbNeCsMbzUNssqYAorzMDK015NEiF.m3u8"
              config={{
                file: {
                  attributes: {
                    poster: 'https://image.mux.com/yoEuEbNeCsMbzUNssqYAorzMDK015NEiF/thumbnail.jpg?width=628&time=1',
                  }
                }
              }}
              width="100%"
              height="250px"
              controls
            />
          </Box>
        </Grid>
      </Content>

      <Content>
        {volunteer[0].volunteerBlurb && (
          <>
            <Link as="div" onClick={() => setBlurbVisible(!blurbVisible)} position="relative" mt={-3}>
              <Box textAlign="center">
                <Box bg="current.bg" d="inline-block" p={4} color="blue.800">
                  <Link as="div" d="inline-block" mr={2}>
                    {blurbVisible ? 'Hide' : 'Share With Co-Workers'}
                  </Link>
                  {blurbVisible ? <UiArrowUp /> : <UiArrowDown />}
                </Box>
              </Box>
              <Divider
                d={blurbVisible ? null : 'none'}
                position="absolute"
                top="50%"
                transform="translateY(-0.5em)"
                left={0}
                right={0}
                zIndex={-1}
              />
            </Link>
            <Grid d={blurbVisible ? null : 'none'} templateColumns={{ base: '1fr', md: '8fr 3fr'}} gap={8}>
              <Box>
                <Heading as="h4" fontSize="2xl" mb={4}>Copy-Pastable Email Blurb</Heading>
                <Box pl={4} ml={4} borderLeftWidth={2} borderColor="blue.600">
                  <ContentfulRichText json={volunteer[0].volunteerBlurb.json} />
                </Box>
              </Box>
              <Box>
                <Button
                  as="a"
                  target="_blank"
                  href={`https://www.linkedin.com/shareArticle/?url=${encodeURIComponent(volunteer[0].volunteerUrl)}`}
                  variantColor="blue"
                  mb={8}
                >
                  Share on LinkedIn
                </Button>
                {volunteer[0].volunteerRecruitingResources?.items.length > 0 && (
                  <>
                    <Heading as="h4" fontSize="xl" mb={4}>More Resources</Heading>
                    {volunteer[0].volunteerRecruitingResources?.items.map((i) => (
                      <Link href={i.url} target="_blank" rel="noopener">
                        <Grid templateColumns="1fr 3fr" borderWidth={1} mb={1} gap={2} alignItems="center" minHeight={16}>
                            {i.contentType.split('/')[0] === 'image' ? (
                              <Image src={i.preview} alt={i.title} />
                            ) : (
                              <Box fontSize={32} textAlign="center">
                                <FilePdf />
                              </Box>
                            )}
                            <Text fontSize="sm" color="current.textLight" mb={0}>{i.title}</Text>
                          </Grid>
                      </Link>
                    ))}
                  </>
                )}
              </Box>
            </Grid>
          </>
        )}
      </Content>

      <Content id="register">
        <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={8}>
          <Box>
            <Heading as="h3" fontSize="2xl" mb={4} bold>Apply</Heading>
            <CognitoForm formId={63} />
          </Box>
          {faqs.length > 0 && (
            <Box backgroundColor="red.50" padding={6} marginTop="-2rem">
              <Heading as="h3" fontSize="2xl" mb={4} bold>FAQs</Heading>
              {faqs.map((faq) => (
                <Box mb={8}>
                  <Heading as="h4" fontSize="md" mb={2} bold>{faq.title}</Heading>
                  <Text><FaqAnswer json={faq.answer.json} /></Text>
                </Box>
              ))}

              More questions? <Button as="a" href="mailto:team@codeday.org">Contact us!</Button>
            </Box>
          )}
        </Grid>
      </Content>
    </Page>
  );
};

function smoothScroll() {
  document.querySelector('#register').scrollIntoView({
      behavior: 'smooth'
  });
}


const query = `{
  cms {
    faqs (
      where: {
        program: {webname:"virtual"},
        audience_contains_all: ["Volunteer"]
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
    programs( limit:1 where: {virtual:true} ) {
      items {
        volunteerPositions
        volunteerUrl
        volunteerRecruitingResources (limit: 10) {
          items {
            title
            contentType
            url
            preview: url(transform: { width:100, height:100, resizeStrategy:FILL })
          }
        }
        volunteerBlurb {
          json
        }
      }
    }
  }
}`;

export async function getStaticProps() {
  const data = await apiFetch(query);
  return {
    props: {
      faqs: data?.cms?.faqs?.items || [],
      volunteer: data?.cms?.programs?.items || [],
    },
    revalidate: 120,
  }
};
