import React from 'react';
import App from './App';
import {InternationalisationProvider} from './Internationalisation';

const Root = () => {
  return (
    <InternationalisationProvider>
      <App />
    </InternationalisationProvider>
  );
};

export default Root;
