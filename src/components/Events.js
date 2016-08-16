'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text
} from 'react-native';

import EventListItem from './EventListItem';

class Events extends Component {

  render() {
    const { edges } = this.props.viewer.events;

    const eventsList = edges.map(event => {
      return (<EventListItem key={event.node.id} event={event.node} />)
    });

    const goToFilter = () => this.props.navigator.pop();

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerTwo}>
          <TouchableOpacity onPress={goToFilter}>
            <Text>I want to be inspired</Text>
          </TouchableOpacity>
        </View>
        {eventsList}
      </ScrollView>
    );
  }
}

export default Relay.createContainer(Events, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        events(first: 10) {
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
  containerTwo: {
    marginTop: 110,
  },
});
