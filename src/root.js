'use strict';

import App from './components/App';
import AppRoute from './routes/AppRoute';
import React, {
  Component,
} from 'react';

import {
  AsyncStorage
} from 'react-native';

import Relay, {
  DefaultNetworkLayer,
} from 'react-relay';

import Registration from './components/Registration';
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

export default class Blackwall extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: undefined
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('User:token', (err, value) => {
      if (!err && value !== undefined) {
        this.setState({token: value});
      } else {
        this.setState({token: null});
      }
    });
  }

  render() {

    const { token } = this.state;

    if (token) {
      const config = {
        fetchTimeout: 5000,   // Timeout after 5s.
        retryDelays: [1000, 3000, 5000, 15000, 30000],   // Retry after 1s, 3s, 5s, 15s and 30s
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      Relay.injectNetworkLayer(
        new LoggingNetworkLayer('https://blackwall-cerebro.herokuapp.com/graphql', config)
        //new LoggingNetworkLayer('http://localhost:3000/graphql', config)
      );

      return <App />;
    }

    if (token === null) {
      const saveToken = (token) => {
        AsyncStorage.setItem('User:token', token, (err) => {
          if (!err) {
            this.setState({token: token});
          } else {
            console.error('err', err);
          }
        });
      }

      // App was not returned so show Registration instead
      return <Registration onSuccess={saveToken} />
    }

    return <Loading />;
  }
}
