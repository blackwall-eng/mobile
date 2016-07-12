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

          <ScrollView style={styles.scene}>
          <StatusBar barStyle="light-content" />
            {getContentView()}

            <Image source={{uri: 'http://www.blackwall.co/style/img/clouds.png'}} style={styles.stars} />

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
    backgroundColor: 'rgba(37, 37, 37, 1)',
  },
  stars: {
    flex:0,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
});
