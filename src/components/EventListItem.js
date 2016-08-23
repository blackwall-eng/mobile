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

    var circleColor = '#00AFFF';
    if (event.categories.edges.length > 0) {
      circleColor = event.categories.edges[0].node.color || circleColor;
    }

    return (
      <View style={styles.container}>
        <View style={[styles.circle, {backgroundColor: circleColor}]}/>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {event.title}
          </Text>
          <Text style={styles.subtitle}>
            {event.subtitle}
          </Text>
        </View>
      </View>
    );
  }
}

export default Relay.createContainer(EventListItem, {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        title,
        subtitle,
        categories(first: 1) {
          edges {
            node {
              color
            }
          }
        }
      }
    `,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontFamily: 'Helvetica',
    fontWeight: '500',
    color: '#252525',
    fontSize: 16,
    marginBottom: 2
  },
  subtitle: {
    color: 'grey',
    fontSize: 14,
  },
  circle: {
    height: 10,
    width: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  }
});
