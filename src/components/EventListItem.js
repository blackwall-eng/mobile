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
        <View style={styles.circle}/>
        <View style={styles.textContainer}>
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
        subtitle
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
    paddingTop: 22,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 13,
  },
  contentContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap'
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
    backgroundColor: '#00AFFF',
    height: 10,
    width: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  }
});
