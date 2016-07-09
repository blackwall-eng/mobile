'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import EventListItem from './EventListItem';

class Events extends Component {

  render() {
    const { edges } = this.props.viewer.events;

    const eventsList = edges.map(event => {
      return (<EventListItem key={event.node.id} event={event.node} />)
    });

    return (
      <View style={styles.container}>
        {eventsList}
      </View>
    );
  }
}

export default Relay.createContainer(Events, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        events(first: 9) {
          edges {
            node {
              id,
              ${EventListItem.getFragment('event')}
            }
          }
        }
      }
    `,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
