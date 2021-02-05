import React from 'react';
import { DefaultSeo } from 'next-seo';
import Box from '@codeday/topo/Atom/Box';
import Text, { Link } from '@codeday/topo/Atom/Text';
import Header, { SiteLogo, Menu } from '@codeday/topo/Organism/Header';
import Image from '@codeday/topo/Atom/Image';
import Footer from '@codeday/topo/Organism/Footer';
import { CodeDay } from '@codeday/topo/Atom/Logo';
import Button from '@codeday/topo/Atom/Button';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default ({
  children, title, darkHeader, slug, ...props
}) => (
  <>
    <DefaultSeo
      title={`${title ? `${title} ~ ` : ''}Virtual CodeDay`}
      description="Make an amazing game or app at Virtual CodeDay!"
      canonical={`https://virtual.codeday.org${slug}`}
      openGraph={{
        type: 'website',
        locale: 'en_US',
        site_name: 'Virtual CodeDay',
        url: `https://virtual.codeday.org${slug}`,
        images: [
          {
            url: 'https://img.codeday.org/w=1104;h=736;fit=crop;crop=faces,edges/9/p/9p3ti4yxbj4xs99xbopc6mxixtivpcegmfj7qoev3ge5qqcapke622gxc6ui6g7p81.jpg',
          },
        ],
      }}
      twitter={{
        handle: '@codeday',
        site: '@codeday',
        cardType: 'summary_large_image',
      }}
    />
    <Box position="relative">
      <Header darkBackground={darkHeader} gradAmount={darkHeader && 'lg'} underscore position="relative" zIndex="1000">
        <SiteLogo>
          <a href="https://www.codeday.org/">
            <CodeDay withText />
          </a>
          <a href="/">
            <Text
              as="span"
              d="inline"
              letterSpacing="-2px"
              fontFamily="heading"
              position="relative"
              top={1}
              ml={1}
              textDecoration="underline"
              bold
            >
              Virtual
            </Text>
          </a>
        </SiteLogo>
        <Menu>
          <Button variant="ghost" as="a" href="/sponsor">Sponsor</Button>
          <Button variant="ghost" as="a" href="/volunteer">Volunteer</Button>
          {publicRuntimeConfig.scheduleEnabled && (
            <Button variant="ghost" as="a" href="/schedule">Schedule</Button>
          )}
          <Button variant="ghost" as="a" href="https://codeday.to/discord">
            <Image width="35px" style={{ marginLeft: 0 }} mr={1} src="/discord.svg" alt="Discord" /> Discord
          </Button>
        </Menu>
      </Header>
      {children}
      <Box mb={16} />
      <Footer />
    </Box>
  </>
);
