import React from 'react';
import Box, { Flex } from '@codeday/topo/Atom/Box'
import {apiFetch} from '@codeday/topo/utils';
import Content from '@codeday/topo/Molecule/Content';
import Text, {Heading, Link} from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import Page from '../../components/Page';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import getConfig from 'next/config';
import { sign } from 'jsonwebtoken'
import { getSession, useSession } from 'next-auth/client';

const { serverRuntimeConfig } = getConfig();


const mutation = (userId, roleId) => `
  mutation {
    account {
      addRole (id: "${userId}", roleId: "${roleId}")
    }
  }`;

export default function Address() {
  const [ session, loading ] = useSession()

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
            <CognitoForm onSubmit={() => {window.location.href = "/registration/checklist"}} formId={86} prefill={{ Username: session.user.nickname, Name: { First: session.user.given_name, Last: session.user.family_name }, Phone: session.user["https://codeday.xyz/phone_number"] || null }} fallback />
          )}
        </Box>
      </Content>
    </Page>
  );
}

export async function getServerSideProps({req, res}) {
  const session = await getSession({req})
  const gqltoken = serverRuntimeConfig.auth0.ACCOUNT_ADMIN_TOKEN
  const token = sign({ scopes: 'write:users' }, gqltoken, { expiresIn: '30s' })
  console.log(session)

  await apiFetch(mutation(session.user.sub, "rol_0ycGdcN2hV3K7Rx2"), null, { Authorization: `Bearer ${token}` })

  return {
    props: {
      session: session || null,
    },
  }
}

