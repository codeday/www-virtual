import React from 'react';
import Box, { Flex } from '@codeday/topo/Atom/Box';
import { apiFetch } from '@codeday/topo/utils';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import { useSession } from 'next-auth/client';
import Page from '../../components/Page';

export default function Address() {
  const [session] = useSession();

  return (
    <Page slug="/registration/address" title="Address">
      <Content>
        <Heading as="h1">Your registration is not yet complete...</Heading>

        <Text fontSize="xl" mb={16}>
          Just a few more questions before we finalize your Virtual CodeDay
          registration:
        </Text>

        <Box>
          {session && (
            <CognitoForm
              onSubmit={() => {
                window.location.href = '/registration/checklist';
              }}
              formId={86}
              prefill={{
                Username: session.user.nickname,
                Name: {
                  First: session.user.given_name,
                  Last: session.user.family_name,
                },
                Phone: session.user['https://codeday.xyz/phone_number'] || null,
              }}
              fallback
            />
          )}
        </Box>
      </Content>
    </Page>
  );
}
