import Theme from '@codeday/topo/Theme';
export default ({ Component, pageProps }) => (
  <Theme withChat analyticsId="INFCSIOS" brandColor="red">
    <Component {...pageProps} />
  </Theme>
);
