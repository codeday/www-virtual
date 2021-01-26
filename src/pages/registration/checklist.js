import React from 'react';
import Box, { Flex } from '@codeday/topo/Atom/Box';
import { apiFetch } from '@codeday/topo/utils';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import Content from '@codeday/topo/Molecule/Content';
import List, { Item } from '@codeday/topo/Atom/List';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import IconBox, { HeaderIcon, HeaderText, Body } from '@codeday/topo/Molecule/IconBox';
import Button from '@codeday/topo/Atom/Button';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import { useSession } from 'next-auth/client';
import Page from '../../components/Page';

export default function CheckList() {
  const [session, loading] = useSession();

  return (
    <Page slug="/registration/checklist" title="Address">
      <Content>
        <Heading as="h1">Now, prepare yourself for fun!</Heading>

        <Text fontSize="xl" mb={16}>
          CodeDay takes place on Discord, and joining our Discord is your final step. Just click the button below!
        </Text>

        <Button as="a" href="https://discord.gg/codeday" variant="solid" variantColor="purple">CodeDay Discord</Button>

        <Text mt={5} mb={0}>Have Questions?</Text>
        <Button as="a" href="https://www.codeday.org/help/virtual" target="_blank">View all FAQs</Button>
        {' '}or{' '}
        <Button as="a" href="mailto:team@codeday.org">contact us!</Button>

      </Content>
    </Page>
  );
}
