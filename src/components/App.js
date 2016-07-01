'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class TodoApp extends Component {

  render() {
    console.log('hey, ', this.props.relay);
    setTimeout(() => {
      console.log('now change');
      this.props.relay.setVariables({
        activityID: "2",
      });
    }, 2000);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Name: {this.props.viewer.name}</Text>
        <Text>Activity: {this.props.viewer.activity.text}</Text>
      </View>
    );
  }
}

export default Relay.createContainer(TodoApp, {
  initialVariables: {
    activityID: "1"
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name
        activity(id: $activityID) {
          text
        }
      }
    `,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? undefined : 20,
  },
  header: {
    alignSelf: 'center',
    color: 'rgba(175, 47, 47, 0.15)',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    fontSize: 100,
    fontWeight: '100',
  },
});
