import React from 'react';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';

const steps = [
  'Come up with ideas.',
  'Find a team.',
  'Start building it! (Beginner workshops - no experience needed!)',
  'Get help from mentors as needed.',
  'Join fun activities and competitions... with prizes!',
  'Show off what you made.',
];

export default function Explainer({ startsAt, ...props }) {
  return (
    <Box {...props}>
      <Heading as="h2" textAlign="center" mb={2} fontSize="4xl">
        The fun starts {startsAt.format('MMMM D')} on our Community Discord!
      </Heading>
      <Text textAlign="center" mb={8} fontSize="xl" bold>Here&apos;s how it works:</Text>
      <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }} gap={8} alignItems="top">
        {steps.map((text, i) => (
          <Box>
            <Image rounded="sm" shadow="md" mb={4} src={`/explainer/${i + 1}.png`} alt="" />
            <Text textAlign="center" fontSize="md" bold mb={0}>{i + 1}. {text}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
