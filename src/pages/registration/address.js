import React from 'react';
import Box from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import { useSession } from 'next-auth/client';
import Page from '../../components/Page';
import checkHasRegistered from '../../utils/checkHasRegistered';

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
                Email: session.user.email,
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

export async function getServerSideProps({ req, res }) {
  const hasRegistered = await checkHasRegistered(req);
  if (hasRegistered) {
    res.writeHead(301, {
      Location: '/registration/checklist'
    });
    res.end();
  }
  return {
    props: {},
  };
}
