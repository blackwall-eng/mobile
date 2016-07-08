'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

class Events extends Component {

  render() {
    const { edges } = this.props.viewer.events;
    console.log('events', edges);
    const eventsList = edges.map(event => (<Text key={event.node.id} style={styles.header}>{event.node.title}</Text>));

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Hallo</Text>
        {eventsList}
      </View>
    );
  }
}

export default Relay.createContainer(Events, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        events(first: 6) {
          edges {
            node {
              id,
              title
            }
          }
        }
      }
    `,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  header: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    paddingTop: 20
  },
});
