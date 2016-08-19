'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';

import EventListItem from './EventListItem';

class Events extends Component {

  render() {
    const { edges } = this.props.viewer.events;

    const eventsList = edges.map(event => {
      return (<EventListItem key={event.node.id} event={event.node} />)
    });

    return (
      <ScrollView style={styles.container}>
        {eventsList}
      </ScrollView>
    );
  }
}

export default Relay.createContainer(Events, {
  initialVariables: {
    category: 'Feel',
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        events(category: $category, first: 10) {
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
  },
});
