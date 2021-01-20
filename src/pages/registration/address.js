import React from 'react';
import Box, { Flex } from '@codeday/topo/Atom/Box'
import {apiFetch} from '@codeday/topo/utils';
import Content from '@codeday/topo/Molecule/Content';
import Text, {Heading, Link} from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import Page from '../../components/Page';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import { useSession } from 'next-auth/client';
import useSWR, { mutate } from 'swr'

const query = (userId, roleId) => `{
  mutation {
    account {
      addRole (id: "${userId}", roleId: "${roleId}")
    }
  }
}`;

export default function Address() {
  const [ session, loading ] = useSession()
  if (!loading) console.log(session);
  // Update this variable to the roleID of the next latest CodeDay
  const latestCodeDayRoleID = "rol_0ycGdcN2hV3K7Rx2";

  return (
    <Page slug="/registration/address" title="Address">
      <Content>
        <Heading as="h1">Almost done...</Heading>

        <Text fontSize="xl" mb={16}>
          After this step, you are officially signed up for this coming Virtual CodeDay.
          The form below will allow you to get <strong>FREE</strong> swag packs from sponsoring companies upon registration and throughout the event.
        </Text>

        <Box>
          {session && (
            <CognitoForm formId={86} prefill={{ Username: session.user.nickname, Name: { First: session.user.given_name, Last: session.user.family_name } }} fallback />
          )}
        </Box>
      </Content>
    </Page>
  );
}

