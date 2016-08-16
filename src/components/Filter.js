'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import FilterListItem from './FilterListItem';

export default class Filter extends Component {

  render() {
    /*const { edges } = this.props.viewer.events;

    const filterList = edges.map(event => {
      return (<FilterListItem key={event.node.id} event={event.node} />)
    });*/

    return (
      <View style={styles.container}>
        <View style={styles.containerTwo}>
        </View>

        <Text>
          coucou
        </Text>

      </View>
    );
  }
}

/*export default Relay.createContainer(Filter, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        events(first: 10) {
          edges {
            node {
              id,
              ${FilterListItem.getFragment('filter')}
            }
          }
        }
      }
    `,
  },
});*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTwo: {
    marginTop: 110,
  },
});
