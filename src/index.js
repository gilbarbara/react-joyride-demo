import 'react-app-polyfill/ie11';
import '@babel/polyfill';
import 'polyfill-array-includes';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const render = Component => {
  return ReactDOM.render(<Component />,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default);
  });
}
