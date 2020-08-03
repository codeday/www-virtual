import React from 'react';
import { apiFetch } from '@codeday/topo/utils';
import Content from '@codeday/topo/Molecule/Content';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Button from '@codeday/topo/Atom/Button';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import Page from '../components/Page';
import FaqAnswer from '../components/FaqAnswer';

export default function Volunteer({ faqs }) {
  return (
    <Page slug="/volunteer" title="Volunteer">
      <Content>
        <Heading as="h2">Volunteer for Virtual CodeDay</Heading>
      </Content>
      {faqs.length > 0 && (
        <Content paddingBottom={8}>
          <Heading as="h3" fontSize="2xl" bold>FAQ:</Heading>
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
      )}
      <Content>
        <Heading as="h3" fontSize="2xl">Apply</Heading>
        <CognitoForm formId={63} />
      </Content>
    </Page>
  );
};

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
  }
}`;

export async function getStaticProps() {
  const data = await apiFetch(query);
  return {
    props: {
      faqs: data?.cms?.faqs?.items || [],
    },
    revalidate: 120,
  }
};
