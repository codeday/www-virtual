import React from 'react';
import Content from '@codeday/topo/Molecule/Content';
import Sponsorship from '@codeday/topo/Organism/Sponsorship';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import Button from '@codeday/topo/Atom/Button';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import Box from '@codeday/topo/Atom/Box';
import Page from '../components/Page';

export default function Sponsor({ faqs }) {
  return (
    <Page slug="/sponsor" title="Sponsor">
      <Content mt={-8}>
        <Heading as="h3" fontSize="4xl" mb={4}>
          Sponsor Virtual CodeDay and reach thousands of tomorrow&apos;s most talented student programmers.
        </Heading>
        <Text>
          Virtual CodeDay reaches 3,000+ student programmers from around the world, and many go on to become the most
          sought-after developers. By sponsoring Virtual CodeDay you&apos;ll support your local technology community
          while remaining top-of-mind for future employment.
        </Text>
        <Text>
          View our sponsorship levels below, then email us at{' '}
          <Link href="mailto:sponsor@codeday.org">sponsor@codeday.org</Link> to get started.
        </Text>
        <Button as="a" href="mailto:sponsor@codeday.org" variantColor="red">Sponsor CodeDay</Button>
      </Content>
      <Content mt={16}>
        <Box textAlign="center" mt={8}>
          <Box
            borderWidth={1}
            borderRadius="md"
            p={10}
            shadow="md"
          >
            <Heading as="h3" fontSize="3xl" mb={4} mt={4}>Sponsorship Levels</Heading>
            <Sponsorship
              textAlign="left"
              d="inline-block"
              webname="virtual"
            />
          </Box>
        </Box>
      </Content>
    </Page>
  );
}
