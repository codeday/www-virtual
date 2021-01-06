import React from 'react';
import PropTypes from 'prop-types';
import Theme from '@codeday/topo/Theme';
import { Auth0Provider } from "@auth0/auth0-react";


export default function App({ Component, pageProps }) {
  return (
    <Auth0Provider
    domain="auth.codeday.xyz"
    clientId="XXXXXXXXXXXXXXXXXXXXXXX"
    redirectUri="http://localhost:3000/schedule">
      <Theme withChat analyticsId="INFCSIOS" brandColor="red">
        <Component {...pageProps} />
      </Theme>
  </Auth0Provider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
App.defaultProps = {
  pageProps: {},
};
