'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

class EventListItem extends Component {

  render() {
    const { event } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {event.title}
        </Text>
        <Text style={styles.subtitle}>
          {event.subtitle}
        </Text>
      </View>
    );
  }
}

export default Relay.createContainer(EventListItem, {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        title,
        subtitle
      }
    `,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    margin: 10,
    padding: 5
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 4
  },
  subtitle: {
    color: 'black',
    fontSize: 12
  }
});
