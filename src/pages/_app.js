import React from 'react';
import PropTypes from 'prop-types';
import Theme from '@codeday/topo/Theme';

export default function App({ Component, pageProps }) {
  return (
    <Theme withChat analyticsId="INFCSIOS" brandColor="red">
      <Component {...pageProps} />
    </Theme>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
App.defaultProps = {
  pageProps: {},
};
