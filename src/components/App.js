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

import Home from './Home';
import Events from './Events';
import AppRoute from '../routes/AppRoute';

import StarsImage from './stars.png';

class App extends Component {

  constructor() {
    super();
    this._swipedx = 0;
    this._swipedy = 0;
    this.state = {
      'currentView': 'Home'
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onPanResponderMove: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) =>
        this._handleOnPanResponderEnd(evt,gestureState),
      onPanResponderTerminate: (evt, gestureState) =>
        this._handleOnPanResponderEnd(evt, gestureState),
      onShouldBlockNativeResponder: (evt, gestureState) => false
    })
  }

  _handleOnPanResponderEnd(evt, gestureState) {
    const {height, width} = Dimensions.get('window');
    let swipex = Math.abs(gestureState.dx);
    let swipey = Math.abs(gestureState.dy);
    if(swipex > swipey && swipex > width/2) {
      if(gestureState.dx > 0) {
        this._handleSwipeRight()
      } else {
        this._handleSwipeLeft()
      }
    }
  }

  _handleSwipeLeft() {
    if(this.state.currentRoute !== 'Profile') {
      this.setState({currentRoute: 'Profile'});
      this.navigator.push({name: 'Profile'});
    }
  }

  _handleSwipeRight() {
    if(this.state.currentRoute !== 'Home') {
      this.setState({currentRoute: 'Home'})
      this.navigator.resetTo({name: 'Home'});
    }
  }

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
              case 'Profile':
                return (
                  <View>
                    <Text style={{color: 'white'}}>Profile</Text>
                  </View>
                );
          }
        }

        return (
          <Image source={StarsImage} style={styles.stars} {...this._panResponder.panHandlers}>
            <StatusBar barStyle="light-content" />
            <View>
              {getContentView()}
            </View>
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
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.VerticalUpSwipeJump,
          gestures: null
        })}
        ref={(c) => this.navigator = c}
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
