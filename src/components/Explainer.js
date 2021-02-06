import React from 'react';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import List, { Item } from '@codeday/topo/Atom/List';
import ReactPlayer from 'react-player';

export default function Explainer({ startsAt, ...props }) {
  return (
    <Box {...props}>
      <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">What happens at Virtual CodeDay?</Heading>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8} alignItems="center">
        <Box>
          <ReactPlayer
            url="https://stream.mux.com/FWHcR3a7Rlg2rocjx6Ly6Xnc00hxCh9Y8.m3u8"
            width="100%"
            controls
          />
        </Box>
        <Box>
          <List styleType="number" stylePosition="inside" mb={4} fontSize="lg">
            <Item>Find a team and an idea.</Item>
            <Item>Attend optional workshops.</Item>
            <Item>Get help from a tech industry mentor.</Item>
            <Item>Participate in fun activities.</Item>
            <Item>Present to judges and win awards!</Item>
          </List>
          <Text fontSize="lg" color="current.textLight" bold>
            It all starts {startsAt.format('MMMM D')} on our community Discord!
          </Text>
        </Box>
      </Grid>
    </Box>
  );
}
