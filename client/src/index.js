import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const renderApp = (App) => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
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