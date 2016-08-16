'use strict';

import Relay, { Renderer } from 'react-relay';
import React, { Component } from 'react';
import {
  Navigator,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import Home from './Home';
import Events from './Events';
import Filter from './Filter';
import AppRoute from '../routes/AppRoute';

import StarsImage from './stars.png';

class App extends Component {
  render() {
    const navigationToScene = (route, navigator) => {
        const getContentView = () => {
          switch (route.name) {
              case 'Home':
                return (
                  <Home navigator={navigator} />
                );
              case 'Filter':
                return (<Filter />);
              case 'Events':
                const renderComponent = ({done, error, props, retry, stale}) => {
                  if (error) {
                    return <Text>{error}</Text>;
                  } else if (props) {
                    return <Events navigator={navigator} {...props} />;
                  } else {
                    return <Text></Text>;
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
          <Image source={StarsImage} style={styles.stars}>
            <StatusBar barStyle="light-content" />

            <ScrollView style={styles.scene}>
              {getContentView()}
            </ScrollView>
          </Image>
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
    backgroundColor: 'rgba(37, 37, 37, 0.9)',
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
  },
  stars: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: 'rgba(37, 37, 37, 1)'
  },
});
