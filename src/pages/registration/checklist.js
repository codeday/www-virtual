import React from 'react';
import { print } from 'graphql';
import { sign } from 'jsonwebtoken';
import Box from '@codeday/topo/Atom/Box';
import { apiFetch } from '@codeday/topo/utils';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Button from '@codeday/topo/Atom/Button';
import { getSession } from 'next-auth/client';
import getConfig from 'next/config';
import Page from '../../components/Page';
import getRoleId from '../../utils/getRoleId';
import ThemeNotifier from '../../components/ThemeNotifier';
import { ChecklistQuery, AddRoleMutation } from './checklist.gql';

const { serverRuntimeConfig } = getConfig();

export default function CheckList({ upcoming }) {
  return (
    <Page slug="/registration/checklist" title="Address">
      <Content wide>
        <ThemeNotifier event={upcoming} mb={12} mt={-6} />
      </Content>
      <Content textAlign="center" maxWidth="2xl" borderWidth={1} borderColor="purple.700" p={0}>
        <Heading as="h1" mt={8} mb={8} fontSize="5xl">
          Registration Confirmed
        </Heading>
        <Box textAlign="center" p={8} bg="purple.700" color="white">
          <Text fontSize="xl">Virtual CodeDay will take place on Discord:</Text>
          <Button
            fontSize="xl"
            as="a"
            href="https://discord.gg/codeday"
            variant="solid"
            bg="white"
            color="purple.700"
          >
            Join the Discord
          </Button>
        </Box>
      </Content>
      <Content textAlign="center">
        <Text mt={5} mb={0}>
          Have Questions?
        </Text>
        <Button
          as="a"
          href="https://www.codeday.org/help/virtual"
          target="_blank"
        >
          View all FAQs
        </Button>{' '}
        or{' '}
        <Button as="a" href="mailto:team@codeday.org">
          contact us!
        </Button>
      </Content>
    </Page>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  const roleId = await getRoleId();
  if (!roleId) throw new Error('Role ID is not set');

  const gqltoken = serverRuntimeConfig.auth0.ACCOUNT_ADMIN_TOKEN;
  const token = sign({ scopes: 'write:users' }, gqltoken, { expiresIn: '30s' });

  await apiFetch(
    print(AddRoleMutation),
    {
      userId: session.user.sub,
      roleId,
    },
    { Authorization: `Bearer ${token}` }
  );

  const data = await apiFetch(print(ChecklistQuery), {
    endDate: (new Date(new Date().getTime())).toISOString(),
  });

  return {
    props: {
      upcoming: data?.cms?.events?.items[0] || null,
      session: session || null,
    },
  };
}
