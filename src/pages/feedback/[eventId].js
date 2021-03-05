import React from 'react';
import Box from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import Page from '../../components/Page';

export default function Feedback({ eventId }) {
  return (
    <Page slug={`/feedback/${eventId}`} title="Feedback?">
      <Content mt={-8}>
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
            CodeDay Feedback Form
          </Box>
          <Box p={8}>
            <CognitoForm
              formId={88}
              onSubmit={() => { window.location.href = '/'; }}
              prefill={{
                EventId: eventId,
              }}
              fallback
            />
          </Box>
        </Box>
      </Content>
    </Page>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { eventId: params?.eventId || 'unknown' },
  };
}
