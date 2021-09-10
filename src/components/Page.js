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

const posterImageUrls = [
  'https://img.codeday.org/o/5/q/5qtzq81wsdb82511t2b4g3oqk59rgsoqwooe5wnnibk3buqi4jg2zftvbziyxu2gsv.png', // space
  'https://img.codeday.org/o/d/p/dph1kpp5s6p53s2p3qfx8k3tprnkmpk5sboa86qui17ffwov1fhb8ga9618tkjma7p.png', // artists meet
  'https://img.codeday.org/o/b/9/b9sg9rxqiiyhxqv28rec89nwjgpm1t8yg5o6irfzm77ojd55yxcptdbr6kjggcenc7.png', // hard shadow
];
export default ({
  children, title, darkHeader, slug, ...props
}) => (
  <>
    <DefaultSeo
      title={`${title ? `${title} ~ ` : ''}Virtual CodeDay`}
      description="The most beginner friendly coding event on the internet"
      canonical={`https://virtual.codeday.org${slug}`}
      openGraph={{
        type: 'website',
        locale: 'en_US',
        site_name: 'Virtual CodeDay',
        url: `https://virtual.codeday.org${slug}`,
        images: [
          {
            url: posterImageUrls[Math.floor(Math.random() * posterImageUrls.length)],
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
          <Button variant="ghost" as="a" href="mailto:sponsor@codeday.org?subject=I'd%20like%20to%20sponsor%20CodeDay">Sponsor</Button>
          <Button variant="ghost" as="a" href="https://www.codeday.org/volunteer/virtual" target="_blank">Volunteer</Button>
          <Button variant="ghost" as="a" href="/posters">Posters</Button>
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
