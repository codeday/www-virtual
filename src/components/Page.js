import { DefaultSeo } from 'next-seo';
import Box from '@codeday/topo/Atom/Box';
import { Link } from '@codeday/topo/Atom/Text';
import Header, { SiteLogo, Menu } from '@codeday/topo/Organism/Header';
import Footer from '@codeday/topo/Organism/Footer';
import { CodeDay } from '@codeday/topo/Atom/Logo';
import Button from '@codeday/topo/Atom/Button';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default ({ children, title, darkHeader, slug, ...props }) => (
  <>
    <DefaultSeo
      title={`${title ? title + ' ~ ' : ''}Virtual CodeDay`}
      description="Make an amazing game or app at Virtual CodeDay!"
      canonical={`https://virtual.codeday.org${slug}`}
      openGraph={{
        type: 'website',
        locale: 'en_US',
        site_name: 'Virtual CodeDay',
        url: `https://virtual.codeday.org${slug}`,
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
          <a href="/">
            <CodeDay withText />
          </a>
        </SiteLogo>
        <Menu>
          <Button variant="ghost" variantColor="brand" as="a" href="/volunteer">Volunteer</Button>
          {publicRuntimeConfig.scheduleEnabled?<Button variant="ghost" variantColor="brand" as="a" href="/schedule">Schedule</Button>:null}
          <Button variant="ghost" variantColor="indigo" as="a" href="https://codeday.to/discord"><img width="35" src="https://discord.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg" /></Button>
          <Button variantColor="brand" as="a" href="https://www.codeday.org/">Back to Regular CodeDay</Button>
        </Menu>
      </Header>
      {children}
      <Footer />
    </Box>
  </>
);
