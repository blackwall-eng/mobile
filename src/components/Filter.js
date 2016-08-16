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

class Filter extends Component {

  render() {
    const { edges } = this.props.viewer.categories;

    const filterList = edges.map(category => {
      return (<FilterListItem key={category.node.id} category={category.node} />)
    });

    return (
      <View style={styles.container}>
        <View style={styles.containerTwo}>
        </View>

        {filterList}

      </View>
    );
  }
}

export default Relay.createContainer(Filter, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        categories(first: 0) {
          edges {
            node {
              id,
              ${FilterListItem.getFragment('category')}
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
