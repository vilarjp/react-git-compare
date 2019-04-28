import React, { Fragment } from 'react';

import { GlobalStyle } from './styles/global';

import Main from './Pages/Main';

const App = () => (
  <Fragment>
    <GlobalStyle />
    <Main />
  </Fragment>
);

export default App;
