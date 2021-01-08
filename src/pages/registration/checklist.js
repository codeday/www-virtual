import React from 'react';
import Box, { Flex } from '@codeday/topo/Atom/Box';
import {apiFetch} from '@codeday/topo/utils';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import Content from '@codeday/topo/Molecule/Content';
import List, { Item } from '@codeday/topo/Atom/List';
import Text, {Heading, Link} from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import IconBox, {HeaderIcon, HeaderText, Body} from '@codeday/topo/Molecule/IconBox';
import Button from '@codeday/topo/Atom/Button';
import Page from '../../components/Page';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import { useSession } from 'next-auth/client';


export default function CheckList() {
  const [ session, loading ] = useSession()

  return (
    <Page slug="/registration/checklist" title="Address">
      <Content>
        <Heading as="h1">Now, prepare yourself for fun!</Heading>

        <Text fontSize="xl" mb={16}>
          Make sure to join our Discord because that is where the event is happening, simply click the button below and you will be taken to link your Discord account to your Codeday account!
        </Text>

        <Button as="a" href="https://discord0.codeday.org/" variant="solid" variantColor="purple">Link Your Discord</Button>
        
        
        <Text mt={5} mb={0}>Have Questions?</Text>
        <Button as="a" href="https://www.codeday.org/help/virtual" target="_blank">View all FAQs</Button>
        {' '}or{' '}
        <Button as="a" href="mailto:team@codeday.org">contact us!</Button>

      </Content>
    </Page>
  );
}

/*
const query = () => `{
  account {
    getUser(where: {email: "bobcat4848@gmail.com"}) {
      discordId
    }
  }
}`;

export async function getStaticProps() {
  const data = await apiFetch(query());
  console.log(data);
  return {
    props: {
      upcoming: data?.cms?.events?.items[0] || null,
    },
    revalidate: 10,
  }
};*/