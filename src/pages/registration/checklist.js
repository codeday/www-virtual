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


export default function CheckList() {

  return (
    <Page slug="/registration/checklist" title="Address">
      <Content>
        <Heading as="h1">Now, prepare yourself for fun!</Heading>

        <Text fontSize="xl" mb={16}>
          Make sure to join our discord because that is where the event is happening and get yourself ahead by checking off some of the boxes below!
        </Text>

          <Flex size="100%" justify="left" alignItems="left" flexDirection="column" flexWrap="wrap">

          <Checkbox spacing="1rem" iconSize="3rem" colorScheme="green" defaultIsChecked>
            Link Your Discord
          </Checkbox>

          <Checkbox mt={2} spacing="1rem" iconSize="3rem" colorScheme="green" defaultIsChecked>
            Add 5 Events to Your Calendar
          </Checkbox>
          
          <Checkbox mt={2} spacing="1rem" iconSize="3rem" colorScheme="green" defaultIsChecked>
            Refer a friend and receive a free t-shirt!
          </Checkbox>

          </Flex>
        

        <Text mt={5} mb={0}>Have Questions?</Text>
        <Button as="a" href="https://www.codeday.org/help/virtual" target="_blank">View all FAQs</Button>
        {' '}or{' '}
        <Button as="a" href="mailto:team@codeday.org">contact us!</Button>
      </Content>
    </Page>
  );
}