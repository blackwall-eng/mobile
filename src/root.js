'use strict';

import App from './components/App';
import AppRoute from './routes/AppRoute';
import React, { Component } from 'react';
import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';

Relay.injectNetworkLayer(
  new DefaultNetworkLayer('https://blackwall-cerebro.herokuapp.com/graphql')
  //new DefaultNetworkLayer('http://127.0.0.1:3000/graphql')
);

export default class Blackwall extends Component {
  render(): void {
    return (
      <RootContainer
        Component={App}
        route={new AppRoute()}
      />
    );
  }
}
