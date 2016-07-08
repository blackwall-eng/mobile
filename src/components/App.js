'use strict';

import Relay, { Renderer } from 'react-relay';
import React, { Component } from 'react';
import {
  Navigator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import Home from './Home';
import Events from './Events';
import AppRoute from '../routes/AppRoute';

class App extends Component {
  render() {
    const navigationToScene = (route, navigator) => {
        const getContentView = () => {
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
          <ScrollView style={styles.scene}>
            {getContentView()}
          </ScrollView>
        )
    }

    const navigationBarRouteMapper = {
      LeftButton: (route, navigator, index, navState) => {
        if (index === 0) {
          return null;
        }

        return (
          <TouchableOpacity
            onPress={() => navigator.pop()}
            style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              Back
            </Text>
          </TouchableOpacity>
        );
      },
      RightButton: (route, navigator, index, navState) =>
           { return null; },
      Title: (route, navigator, index, navState) =>
           { return null; },
    };

    return (
      <Navigator
        initialRoute={{name:  'Home'}}
        renderScene={navigationToScene}
        configureScene={() => Navigator.SceneConfigs.VerticalUpSwipeJump}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={navigationBarRouteMapper}
            style={styles.navBar}
          />}
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

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
    color: 'white'
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  scene: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: 'black',
  },
});
