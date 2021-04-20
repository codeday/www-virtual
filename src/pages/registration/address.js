import React from 'react';
import Box from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import { useSession, getSession } from 'next-auth/client';
import Page from '../../components/Page';
import checkHasRegistered from '../../utils/checkHasRegistered';
import getEventId from '../../utils/getEventId';

export default function Address({ eventId }) {
  const [session] = useSession();

  return (
    <Page slug="/registration/address" title="Address">
      <Content>
        <Heading as="h2" mb={4}>Your registration is NOT yet complete...</Heading>

        <Box borderWidth={1} shadow="md" rounded="md" oveflow="hidden">
          <Box
            bg="purple.700"
            color="purple.50"
            fontSize="xl"
            p={4}
            fontWeight="bold"
            rounded="md"
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
          >
            CodeDay Registration Form
          </Box>
          <Box p={8}>
            {session && (
              <CognitoForm
                onSubmit={() => {
                  window.location.href = '/registration/checklist';
                }}
                formId={86}
                prefill={{
                  Username: session.user.nickname,
                  Email: session.user.email,
                  EventId: eventId,
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
        </Box>
      </Content>
    </Page>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
  if (!session || !session.user) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
  }

  const hasRegistered = await checkHasRegistered(req);
  if (hasRegistered && false) {
    res.writeHead(302, {
      Location: '/registration/checklist',
    });
    res.end();
  }
  return {
    props: { eventId: await getEventId() },
  };
}
