import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const renderApp = (App) => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp(require('./App'));
    console.log('App updated successfully.');
  });
}