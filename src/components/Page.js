import { DefaultSeo } from 'next-seo';
import Box from '@codeday/topo/Atom/Box';
import { Link } from '@codeday/topo/Atom/Text';
import Header, { SiteLogo, Menu } from '@codeday/topo/Organism/Header';
import Footer from '@codeday/topo/Organism/Footer';
import { CodeDay } from '@codeday/topo/Atom/Logo';
import Button from '@codeday/topo/Atom/Button';

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
          <Button variant="outline" variantColor="brand" as="a" href="/volunteer">Volunteer</Button>
          <Button variant="outline" variantColor="brand" as="a" href="/schedule">Schedule</Button>
          <Button variantColor="brand" as="a" href="https://www.codeday.org/">Back to Regular CodeDay</Button>
        </Menu>
      </Header>
      {children}
      <Footer />
    </Box>
  </>
);
