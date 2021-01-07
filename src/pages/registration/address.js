import React from 'react';
import Box, { Flex } from '@codeday/topo/Atom/Box'
import {apiFetch} from '@codeday/topo/utils';
import Content from '@codeday/topo/Molecule/Content';
import Text, {Heading, Link} from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import Page from '../../components/Page';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';

export default function Address() {

  return (
    <Page slug="/registration/address" title="Address">
      <Content>
        <Heading as="h1">Almost done...</Heading>

        <Text fontSize="xl" mb={16}>
          After this step, you are officially signed up for this coming Virtual CodeDay.
          The form below will allow you to get <strong>FREE</strong> swag packs from sponsoring companies upon registration and throughout the event.
        </Text>

        <Box>
          <CognitoForm formId={53} fallback />
        </Box>
      </Content>
    </Page>
  );
}