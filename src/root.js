'use strict';

import App from './components/App';
import AppRoute from './routes/AppRoute';
import React, { Component } from 'react';
import Relay, {
  DefaultNetworkLayer,
  Renderer,
} from 'react-relay';

class LoggingNetworkLayer extends DefaultNetworkLayer {
  sendQueries(queries) {
    queries.forEach((query) => console.log('query: ', query.getDebugName(), query.getQueryString()))
    // Send the queries using the default network implementation
    return super.sendQueries(queries);
  }
};

Relay.injectNetworkLayer(
  new LoggingNetworkLayer('https://blackwall-cerebro.herokuapp.com/graphql')
  //new DefaultNetworkLayer('http://127.0.0.1:3000/graphql')
);

export default class Blackwall extends Component {
  render() {
    return (
      <Renderer
        Container={App}
        environment={Relay.Store}
        queryConfig={new AppRoute()}
      />
    );
  }
}
