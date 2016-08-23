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
  ScrollView,
  PanResponder,
  Dimensions
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Home from './Home';
import Filter from './Filter';
import EventDetail from './EventDetail';

import AppRoute from '../routes/AppRoute';
import EventRoute from '../routes/EventRoute';

import StarsImage from './stars.png';

class App extends Component {

  render() {
    const navigationToScene = (route, navigator) => {
        const getContentView = () => {
          switch (route.name) {
              case 'Home':
                const renderHome = ({done, error, props, retry, stale}) => {
                  if (error) {
                    return <Text>{error}</Text>;
                  } else if (props) {
                    return <Home navigator={navigator} {...props} />;
                  } else {
                    return <Text></Text>;
                  }
                }
                return (
                  <Renderer
                    Container={Home}
                    queryConfig={new AppRoute()}
                    environment={Relay.Store}

                    render={renderHome}
                    />
                );
              case 'Filter':
                const renderFilter = ({done, error, props, retry, stale}) => {
                  if (error) {
                    return <Text>{error}</Text>;
                  } else if (props) {
                    return <Filter navigator={navigator} {...props} />;
                  } else {
                    return <Text>Loading...</Text>;
                  }
                }
                return (
                  <Renderer
                    Container={Filter}
                    queryConfig={new AppRoute()}
                    environment={Relay.Store}
                    render={renderFilter}
                    />
                );
              case 'Event':
                const eventID = route.eventID;
                const renderEventDetail = ({done, error, props, retry, stale}) => {
                  if (error) {
                    return <Text>{error}</Text>;
                  } else if (props) {
                    return <EventDetail navigator={navigator} {...props} />;
                  } else {
                    return <Text>Loading...</Text>;
                  }
                }
                return (
                  <Renderer
                    Container={EventDetail}
                    queryConfig={new EventRoute({eventID: eventID})}
                    environment={Relay.Store}
                    render={renderEventDetail}
                    />
                );
          }
        }

        return (
          <Image source={StarsImage} style={styles.stars}>
            <StatusBar barStyle="light-content" />
            <ScrollableTabView renderTabBar={() => <View />}>
              <View tabLabel="Main" style={styles.scene}>
                {getContentView()}
              </View>
              <View tabLabel="Profile" style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'white'}}>Profile</Text>
              </View>
            </ScrollableTabView>
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
        initialRoute={{name:  'Home', gestures: null}}
        renderScene={navigationToScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.VerticalUpSwipeJump,
          gestures: route.gestures || null
        })}
        ref={(c) => this.navigator = c}
        navigationBar={null}
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
  scene: {
    flex: 1,
  },
  stars: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: 'rgb(37, 37, 37)'
  },
});
