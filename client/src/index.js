import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const apolloClient = new ApolloClient({
  uri: `${APP_BASE_URL}/graphql`
});

const renderApp = (App) => {
  ReactDOM.render(
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
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
