import React from 'react';
import Box, { Flex } from '@codeday/topo/Atom/Box';
import { apiFetch } from '@codeday/topo/utils';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import Content from '@codeday/topo/Molecule/Content';
import List, { Item } from '@codeday/topo/Atom/List';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import IconBox, {
  HeaderIcon,
  HeaderText,
  Body,
} from '@codeday/topo/Molecule/IconBox';
import Button from '@codeday/topo/Atom/Button';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import { useSession } from 'next-auth/client';
import getConfig from 'next/config';
import Page from '../../components/Page';

const { serverRuntimeConfig } = getConfig();

const mutation = (userId, roleId) => `
  mutation {
    account {
      addRole (id: "${userId}", roleId: "${roleId}")
    }
  }`;

export default function CheckList() {
  return (
    <Page slug="/registration/checklist" title="Address">
      <Content>
        <Heading as="h1">
          Your registration is confirmed! Now, prepare yourself for fun!
        </Heading>
        <Text fontSize="xl">
          Virtual CodeDay takes place on Discord (a community chat platform).
          Once the event starts, you&apos;ll use Discord to find an idea to work
          on, form a team, get help from mentors, and participate in fun
          activities.
        </Text>
        <Text fontSize="xl">
          We recommend you join the Discord right now so you&apos;re ready for
          the event kickoff:
        </Text>
        <Box textAlign="center" mb={8}>
          <Button
            as="a"
            href="https://discord.gg/codeday"
            variant="solid"
            variantColor="purple"
          >
            Join the CodeDay Discord
          </Button>
        </Box>
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
  const gqltoken = serverRuntimeConfig.auth0.ACCOUNT_ADMIN_TOKEN;
  const token = sign({ scopes: 'write:users' }, gqltoken, { expiresIn: '30s' });

  // TODO(@tylermenezes) Move constants into an env file.
  await apiFetch(mutation(session.user.sub, 'rol_0ycGdcN2hV3K7Rx2'), null, {
    Authorization: `Bearer ${token}`,
  });

  return {
    props: {
      session: session || null,
    },
  };
}
