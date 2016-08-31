'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Navigator
} from 'react-native';

class EventListItem extends Component {

  render() {
    const { event, navigator, clickDisabled } = this.props;

    var circleColor = '#00AFFF';
    if (event.categories.edges.length > 0) {
      circleColor = event.categories.edges[0].node.color || circleColor;
    }

    const goToDetail = () => {
      if (clickDisabled) {
        return;
      }
      navigator.push({name: 'Event', eventID: event.eventID, sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump});
    }

    const titleStyle = active ? [styles.title, {weight: '100' }] : styles.title;

    return (
      <TouchableOpacity onPress={goToDetail}>
        <View style={styles.container}>
          <View style={[styles.circle, {backgroundColor: circleColor}]} />
          <View style={styles.contentContainer}>
            <Text style={titleStyle} numberOfLines={1}>
              {event.title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {event.subtitle}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Relay.createContainer(EventListItem, {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        eventID,
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
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    paddingVertical: 24,
    paddingLeft: 28,
    paddingRight: 10,
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
    height: 11,
    width: 11,
    marginLeft: 6,
    marginRight: 28,
    borderRadius: 7,
  }
});
