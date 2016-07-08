'use strict';

import Relay, { Renderer } from 'react-relay';
import React, { Component } from 'react';
import {
  Navigator,
  Text
} from 'react-native';

import Home from './Home';
import Events from './Events';
import AppRoute from '../routes/AppRoute';

class App extends Component {

  render() {
    const navigationToScene = (route, navigator) => {
        switch (route.name) {
            case 'Home':
              return (
                <Home navigator={navigator} />
              );
            case 'Events':
              const renderComponent = ({done, error, props, retry, stale}) => {
                if (error) {
                  return <Text>{error}</Text>;
                } else if (props) {
                  return <Events navigator={navigator} {...props} />;
                } else {
                  return <Text>Loading...</Text>;
                }
              }
              return (
                <Renderer
                  Container={Events}
                  queryConfig={new AppRoute()}
                  environment={Relay.Store}
                  forceFetch={true}
                  render={renderComponent}
                  />
              );
        }
    }

    return (
      <Navigator
        initialRoute={{name:  'Home'}}
        renderScene={navigationToScene}
        configureScene={() => Navigator.SceneConfigs.VerticalUpSwipeJump}
      />
    );
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    activityID: "1"
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name
      }
    `,
  },
});
