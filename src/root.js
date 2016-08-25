'use strict';

import App from './components/App';
import AppRoute from './routes/AppRoute';
import React, { Component } from 'react';
import Relay, {
  DefaultNetworkLayer,
  Renderer,
} from 'react-relay';

import Loading from './components/Loading';

class LoggingNetworkLayer extends DefaultNetworkLayer {
  sendQueries(queries) {
    queries.forEach((query) => console.log('query: ', query.getDebugName(), query.getQueryString()))
    // Send the queries using the default network implementation
    return super.sendQueries(queries);
  }

  sendMutation(mutationRequest) {
    console.log('mutation: ', mutationRequest.getDebugName(), mutationRequest.getQueryString());
    // Send the mutation using the default network implementation
    return super.sendMutation(mutationRequest);
  }
};

Relay.injectNetworkLayer(
  new LoggingNetworkLayer('https://blackwall-cerebro.herokuapp.com/graphql')
  //new LoggingNetworkLayer('http://localhost:3000/graphql')
);

export default class Blackwall extends Component {
  render() {
    return <App />;
  }
}
