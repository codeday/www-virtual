import React from 'react';
import { print } from 'graphql';
import { sign } from 'jsonwebtoken';
import Box from '@codeday/topo/Atom/Box';
import { apiFetch } from '@codeday/topo/utils';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image'
import Button from '@codeday/topo/Atom/Button';
import { getSession } from 'next-auth/client';
import getConfig from 'next/config';
import Page from '../../components/Page';
import getRoleId from '../../utils/getRoleId';
import ThemeNotifier from '../../components/ThemeNotifier';
import { ChecklistQuery, AddRoleMutation } from './checklist.gql';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize';
const { serverRuntimeConfig } = getConfig();

export default function CheckList({ upcoming }) {
  const { width, height } = useWindowSize()
  return (
    <Page slug="/registration/checklist" title="Registration Confirmed">
      <Content wide>
        <ThemeNotifier event={upcoming} mb={12} mt={-6} />
      </Content>
      <Content textAlign="center" maxWidth="2xl" borderWidth={1} borderColor="purple.700" p={0}>
        {typeof window !== 'undefined'? <Confetti recycle={false} height={height} width={width-20}/>  : null }
        {/* width-20 there because otherwise it creates a horizontal scrollbar, not sure why, i tried
        setting overflow:hidden on it but that still didn't make it work? idk */}
        <Heading as="h1" mt={8} mb={8} fontSize="5xl">
          Registration Confirmed!
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
      <Content textAlign="center" maxWidth="2xl" borderWidth={1} borderColor="purple.600" p={0}>
        <Box textAlign="center" p={8} bg="purple.600" color="white">
        <Heading as="h2" fontSize="xl">CodeDay is more fun with friends:</Heading>
          <Button m={4} p={4} bg="blue.400" as="a" variant="solid" color="white" href="https://twitter.com/intent/tweet?related=codeday&text=I%27ll%20be%20attending%20virtual%20%23CodeDay%2C%20a%2048-hour%20event%20where%20anyone%20can%20learn%20to%20code-%20join%20me%20here%F0%9F%91%87%F0%9F%91%87&url=https://virtual.codeday.org">
            <Image width="3em" p={4} pl={0} src="/twitter.svg" alt="Twitter" />Share
          </Button>
          <Button m={4} p={4} bg="pink.400" as="a" variant="solid" color="white" href="../posters">
            View Posters
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
      session: null,
    },
  };
}
